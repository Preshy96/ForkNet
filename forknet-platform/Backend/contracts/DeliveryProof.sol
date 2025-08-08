// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// DeliveryProof.sol

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DeliveryProof is ERC721, Ownable, ReentrancyGuard {
    
    enum ProofStatus { Pending, Verified, Disputed }
    
    struct Proof {
        uint256 tokenId;
        uint256 orderId;
        address driver;
        address customer;
        string proofHash; // IPFS hash
        ProofStatus status;
        uint256 timestamp;
        bool customerConfirmed;
    }
    
    mapping(uint256 => Proof) public proofs;
    mapping(uint256 => bool) public orderHasProof;
    mapping(address => bool) public authorizedMinters;
    mapping(string => bool) public usedHashes;
    
    uint256 private _nextTokenId = 1;
    string public baseTokenURI;
    
    event ProofMinted(uint256 indexed tokenId, uint256 indexed orderId, address driver, string proofHash);
    event ProofVerified(uint256 indexed tokenId, ProofStatus status);
    event CustomerConfirmation(uint256 indexed tokenId, bool confirmed);
    
    error UnauthorizedMinter();
    error OrderAlreadyHasProof();
    error ProofHashUsed();
    error TokenNotFound();
    error UnauthorizedAccess();
    
    modifier onlyAuthorizedMinter() {
        if (!authorizedMinters[msg.sender] && msg.sender != owner()) revert UnauthorizedMinter();
        _;
    }
    
    modifier tokenExists(uint256 _tokenId) {
        if (_ownerOf(_tokenId) == address(0)) revert TokenNotFound();
        _;
    }
    
    constructor(address initialOwner, string memory _baseTokenURI) 
        ERC721("ForkNet Delivery Proof", "FORK-PROOF") 
        Ownable(initialOwner) 
    {
        authorizedMinters[initialOwner] = true;
        baseTokenURI = _baseTokenURI;
    }
    
    function setAuthorizedMinter(address _minter, bool _authorized) external onlyOwner {
        authorizedMinters[_minter] = _authorized;
    }
    
    function updateBaseURI(string calldata _newBaseURI) external onlyOwner {
        baseTokenURI = _newBaseURI;
    }
    
    function mintDeliveryProof(
        uint256 _orderId,
        address _driver,
        address _customer,
        string calldata _proofHash
    ) external onlyAuthorizedMinter nonReentrant returns (uint256) {
        if (orderHasProof[_orderId]) revert OrderAlreadyHasProof();
        if (usedHashes[_proofHash]) revert ProofHashUsed();
        
        uint256 tokenId = _nextTokenId++;
        
        proofs[tokenId] = Proof({
            tokenId: tokenId,
            orderId: _orderId,
            driver: _driver,
            customer: _customer,
            proofHash: _proofHash,
            status: ProofStatus.Pending,
            timestamp: block.timestamp,
            customerConfirmed: false
        });
        
        orderHasProof[_orderId] = true;
        usedHashes[_proofHash] = true;
        
        _safeMint(_driver, tokenId);
        
        emit ProofMinted(tokenId, _orderId, _driver, _proofHash);
        
        return tokenId;
    }
    
    function confirmDelivery(uint256 _tokenId) 
        external 
        tokenExists(_tokenId) 
    {
        Proof storage proof = proofs[_tokenId];
        if (msg.sender != proof.customer) revert UnauthorizedAccess();
        
        proof.customerConfirmed = true;
        
        emit CustomerConfirmation(_tokenId, true);
    }
    
    function verifyProof(uint256 _tokenId, ProofStatus _status) 
        external 
        onlyOwner 
        tokenExists(_tokenId) 
    {
        proofs[_tokenId].status = _status;
        
        emit ProofVerified(_tokenId, _status);
    }
    
    function getProof(uint256 _tokenId) external view tokenExists(_tokenId) returns (Proof memory) {
        return proofs[_tokenId];
    }
    
    function hasOrderProof(uint256 _orderId) external view returns (bool) {
        return orderHasProof[_orderId];
    }
    
    function tokenURI(uint256 _tokenId) public view override tokenExists(_tokenId) returns (string memory) {
        return string(abi.encodePacked(baseTokenURI, Strings.toString(_tokenId), ".json"));
    }
    
    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }
    
    // Prevent transfers - soulbound NFTs
    function _update(address to, uint256 tokenId, address auth) 
        internal 
        override 
        returns (address) 
    {
        address from = _ownerOf(tokenId);
        require(from == address(0) || to == address(0), "Soulbound: transfers disabled");
        return super._update(to, tokenId, auth);
    }
}

// Import for Strings utility
library Strings {
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}