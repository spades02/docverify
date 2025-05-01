// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerifier {
    struct Document {
        string fileHash; // Hash of the document file
        address owner; // Address of the uploader
        uint256 timestamp; // Time of upload
    }

    mapping(string => Document) private documents;
    mapping(address => bool) public isUploader;

    modifier onlyUploader() {
        require(isUploader[msg.sender], "Not authorized");
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == address(this), "Not the contract owner");
        _;
    }

    event DocumentUploaded(
        string fileHash,
        address indexed owner,
        uint256 timestamp
    );
    event DocumentVerified(
        string fileHash,
        bool isValid,
        address indexed verifier
    );

    /**
     * @dev Uploads a document's hash to the blockchain.
     * @param fileHash The hash of the document.
     */
    function uploadDocument(string memory fileHash) public {
        require(bytes(fileHash).length > 0, "Invalid file hash");
        require(documents[fileHash].timestamp == 0, "Document already exists");

        documents[fileHash] = Document(fileHash, msg.sender, block.timestamp);
        emit DocumentUploaded(fileHash, msg.sender, block.timestamp);
    }

    function addUploader(address _uploader) public onlyOwner {
        isUploader[_uploader] = true;
    }

    /**
     * @dev Verifies if a document exists on the blockchain.
     * @param fileHash The hash of the document to verify.
     * @return isValid True if the document exists, false otherwise.
     */
    function verifyDocument(
        string memory fileHash
    ) public returns (bool isValid) {
        isValid = documents[fileHash].timestamp != 0;
        emit DocumentVerified(fileHash, isValid, msg.sender);
    }

    /**
     * @dev Retrieves document details.
     * @param fileHash The hash of the document.
     * @return owner The address of the owner.
     * @return timestamp The upload timestamp.
     */
    function getDocumentDetails(
        string memory fileHash
    ) public view returns (address owner, uint256 timestamp) {
        require(documents[fileHash].timestamp != 0, "Document not found");
        Document memory doc = documents[fileHash];
        return (doc.owner, doc.timestamp);
    }
}
