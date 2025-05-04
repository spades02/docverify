// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract DocumentVerifier is Ownable, AccessControl {
    bytes32 public constant UPLOADER_ROLE = keccak256("UPLOADER_ROLE");

    struct Document {
        address uploader;
        uint256 timestamp;
    }

    mapping(bytes32 => Document) private documents;

    event DocumentUploaded(bytes32 indexed fileHash, address indexed uploader);
    event UploaderAdded(address indexed account);
    event UploaderRemoved(address indexed account);
    event DocumentVerified(
        bytes32 indexed fileHash,
        bool isValid,
        address indexed verifier
    );

    constructor(address initialOwner) Ownable(initialOwner) {
        _grantRole(DEFAULT_ADMIN_ROLE, initialOwner);
        _grantRole(UPLOADER_ROLE, initialOwner);
    }

    modifier onlyUploader() {
        require(hasRole(UPLOADER_ROLE, msg.sender), "Not authorized to upload");
        _;
    }

    function addUploader(address account) external onlyOwner {
        _grantRole(UPLOADER_ROLE, account);
        emit UploaderAdded(account);
    }

    function revokeUploader(address account) external onlyOwner {
        _revokeRole(UPLOADER_ROLE, account);
        emit UploaderRemoved(account);
    }

    function uploadDocument(bytes32 fileHash) external onlyUploader {
        require(
            documents[fileHash].uploader == address(0),
            "Document already exists"
        );
        documents[fileHash] = Document(msg.sender, block.timestamp);
        emit DocumentUploaded(fileHash, msg.sender);
    }

    function verifyDocument(
        bytes32 fileHash
    ) external view returns (bool isValid) {
        return documents[fileHash].timestamp != 0;
    }

    function getUploader(bytes32 fileHash) external view returns (address) {
        return documents[fileHash].uploader;
    }

    function getTimestamp(bytes32 fileHash) external view returns (uint256) {
        return documents[fileHash].timestamp;
    }
}
