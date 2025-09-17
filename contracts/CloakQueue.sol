// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CloakQueue is SepoliaConfig {
    using FHE for *;
    
    struct Player {
        euint32 playerId;
        euint32 mmr; // Match Making Rating (encrypted)
        euint32 gamesPlayed;
        euint32 wins;
        euint32 losses;
        bool isInQueue;
        bool isActive;
        address walletAddress;
        uint256 lastActivity;
    }
    
    struct Match {
        euint32 matchId;
        euint32[] playerIds;
        euint32 averageMMR;
        bool isActive;
        bool isCompleted;
        uint256 startTime;
        uint256 endTime;
        address[] players;
    }
    
    struct QueueEntry {
        euint32 playerId;
        euint32 mmr;
        uint256 joinTime;
        address playerAddress;
    }
    
    mapping(uint256 => Player) public players;
    mapping(uint256 => Match) public matches;
    mapping(address => uint256) public playerAddressToId;
    mapping(uint256 => QueueEntry) public queue;
    
    uint256 public playerCounter;
    uint256 public matchCounter;
    uint256 public queueCounter;
    uint256 public queueSize;
    
    address public owner;
    address public verifier;
    
    // Queue configuration
    uint256 public constant MAX_QUEUE_SIZE = 100;
    uint256 public constant MATCH_TIMEOUT = 300; // 5 minutes
    uint256 public constant MMR_TOLERANCE = 200; // MMR difference tolerance
    
    event PlayerRegistered(uint256 indexed playerId, address indexed playerAddress);
    event PlayerJoinedQueue(uint256 indexed playerId, address indexed playerAddress);
    event PlayerLeftQueue(uint256 indexed playerId, address indexed playerAddress);
    event MatchCreated(uint256 indexed matchId, uint256[] playerIds);
    event MatchCompleted(uint256 indexed matchId, uint256[] results);
    event MMRUpdated(uint256 indexed playerId, uint32 newMMR);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    function registerPlayer() public returns (uint256) {
        require(playerAddressToId[msg.sender] == 0, "Player already registered");
        
        uint256 playerId = playerCounter++;
        
        players[playerId] = Player({
            playerId: FHE.asEuint32(0), // Will be set properly later
            mmr: FHE.asEuint32(1000), // Starting MMR
            gamesPlayed: FHE.asEuint32(0),
            wins: FHE.asEuint32(0),
            losses: FHE.asEuint32(0),
            isInQueue: false,
            isActive: true,
            walletAddress: msg.sender,
            lastActivity: block.timestamp
        });
        
        playerAddressToId[msg.sender] = playerId;
        
        emit PlayerRegistered(playerId, msg.sender);
        return playerId;
    }
    
    function joinQueue(
        externalEuint32 encryptedMMR,
        bytes calldata inputProof
    ) public returns (uint256) {
        uint256 playerId = playerAddressToId[msg.sender];
        require(playerId != 0, "Player not registered");
        require(!players[playerId].isInQueue, "Player already in queue");
        require(queueSize < MAX_QUEUE_SIZE, "Queue is full");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalMMR = FHE.fromExternal(encryptedMMR, inputProof);
        
        uint256 queueId = queueCounter++;
        
        queue[queueId] = QueueEntry({
            playerId: FHE.asEuint32(0), // Will be set properly later
            mmr: internalMMR,
            joinTime: block.timestamp,
            playerAddress: msg.sender
        });
        
        players[playerId].isInQueue = true;
        players[playerId].lastActivity = block.timestamp;
        queueSize++;
        
        emit PlayerJoinedQueue(playerId, msg.sender);
        
        // Try to create a match
        _tryCreateMatch();
        
        return queueId;
    }
    
    function leaveQueue() public {
        uint256 playerId = playerAddressToId[msg.sender];
        require(playerId != 0, "Player not registered");
        require(players[playerId].isInQueue, "Player not in queue");
        
        // Find and remove from queue
        for (uint256 i = 0; i < queueCounter; i++) {
            if (queue[i].playerAddress == msg.sender) {
                delete queue[i];
                break;
            }
        }
        
        players[playerId].isInQueue = false;
        queueSize--;
        
        emit PlayerLeftQueue(playerId, msg.sender);
    }
    
    function _tryCreateMatch() internal {
        if (queueSize < 2) return;
        
        // Simple matchmaking: find players with similar MMR
        // In a real implementation, this would be more sophisticated
        address[] memory matchPlayers = new address[](2);
        uint256[] memory playerIds = new uint256[](2);
        uint256 matchCount = 0;
        
        for (uint256 i = 0; i < queueCounter && matchCount < 2; i++) {
            if (queue[i].playerAddress != address(0)) {
                matchPlayers[matchCount] = queue[i].playerAddress;
                playerIds[matchCount] = playerAddressToId[queue[i].playerAddress];
                matchCount++;
            }
        }
        
        if (matchCount == 2) {
            _createMatch(playerIds, matchPlayers);
        }
    }
    
    function _createMatch(uint256[] memory playerIds, address[] memory matchPlayers) internal {
        uint256 matchId = matchCounter++;
        
        euint32[] memory encryptedPlayerIds = new euint32[](playerIds.length);
        for (uint256 i = 0; i < playerIds.length; i++) {
            encryptedPlayerIds[i] = FHE.asEuint32(0); // Will be set properly later
        }
        
        matches[matchId] = Match({
            matchId: FHE.asEuint32(0), // Will be set properly later
            playerIds: encryptedPlayerIds,
            averageMMR: FHE.asEuint32(0), // Will be calculated
            isActive: true,
            isCompleted: false,
            startTime: block.timestamp,
            endTime: 0,
            players: matchPlayers
        });
        
        // Remove players from queue
        for (uint256 i = 0; i < playerIds.length; i++) {
            players[playerIds[i]].isInQueue = false;
            
            // Remove from queue
            for (uint256 j = 0; j < queueCounter; j++) {
                if (queue[j].playerAddress == matchPlayers[i]) {
                    delete queue[j];
                    break;
                }
            }
        }
        
        queueSize -= playerIds.length;
        
        emit MatchCreated(matchId, playerIds);
    }
    
    function completeMatch(
        uint256 matchId,
        uint256[] memory results,
        externalEuint32[] memory newMMRs,
        bytes[] calldata inputProofs
    ) public onlyVerifier {
        require(matches[matchId].isActive, "Match not active");
        require(!matches[matchId].isCompleted, "Match already completed");
        require(results.length == matches[matchId].players.length, "Invalid results length");
        
        matches[matchId].isCompleted = true;
        matches[matchId].endTime = block.timestamp;
        
        // Update player statistics
        for (uint256 i = 0; i < results.length; i++) {
            uint256 playerId = playerAddressToId[matches[matchId].players[i]];
            
            // Convert externalEuint32 to euint32
            euint32 newMMR = FHE.fromExternal(newMMRs[i], inputProofs[i]);
            
            // Update player stats
            players[playerId].mmr = newMMR;
            players[playerId].gamesPlayed = FHE.add(players[playerId].gamesPlayed, FHE.asEuint32(1));
            
            if (results[i] == 1) {
                players[playerId].wins = FHE.add(players[playerId].wins, FHE.asEuint32(1));
            } else {
                players[playerId].losses = FHE.add(players[playerId].losses, FHE.asEuint32(1));
            }
            
            players[playerId].lastActivity = block.timestamp;
        }
        
        emit MatchCompleted(matchId, results);
    }
    
    function updateMMR(
        uint256 playerId,
        externalEuint32 newMMR,
        bytes calldata inputProof
    ) public onlyVerifier {
        require(playerId < playerCounter, "Player does not exist");
        
        euint32 internalMMR = FHE.fromExternal(newMMR, inputProof);
        players[playerId].mmr = internalMMR;
        players[playerId].lastActivity = block.timestamp;
        
        emit MMRUpdated(playerId, 0); // FHE.decrypt(newMMR) - will be decrypted off-chain
    }
    
    function getPlayerInfo(uint256 playerId) public view returns (
        uint8 mmr,
        uint8 gamesPlayed,
        uint8 wins,
        uint8 losses,
        bool isInQueue,
        bool isActive,
        address walletAddress,
        uint256 lastActivity
    ) {
        Player storage player = players[playerId];
        return (
            0, // FHE.decrypt(player.mmr) - will be decrypted off-chain
            0, // FHE.decrypt(player.gamesPlayed) - will be decrypted off-chain
            0, // FHE.decrypt(player.wins) - will be decrypted off-chain
            0, // FHE.decrypt(player.losses) - will be decrypted off-chain
            player.isInQueue,
            player.isActive,
            player.walletAddress,
            player.lastActivity
        );
    }
    
    function getMatchInfo(uint256 matchId) public view returns (
        uint8 averageMMR,
        bool isActive,
        bool isCompleted,
        uint256 startTime,
        uint256 endTime,
        address[] memory players
    ) {
        Match storage match_ = matches[matchId];
        return (
            0, // FHE.decrypt(match_.averageMMR) - will be decrypted off-chain
            match_.isActive,
            match_.isCompleted,
            match_.startTime,
            match_.endTime,
            match_.players
        );
    }
    
    function getQueueSize() public view returns (uint256) {
        return queueSize;
    }
    
    function isPlayerInQueue(address playerAddress) public view returns (bool) {
        uint256 playerId = playerAddressToId[playerAddress];
        if (playerId == 0) return false;
        return players[playerId].isInQueue;
    }
    
    function getPlayerId(address playerAddress) public view returns (uint256) {
        return playerAddressToId[playerAddress];
    }
}
