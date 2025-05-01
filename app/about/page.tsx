export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About DocVerify</h1>
        
        <div className="prose prose-lg">
          <p className="text-lg text-muted-foreground mb-6">
            DocVerify is a cutting-edge document verification platform that leverages blockchain technology to ensure the authenticity and integrity of digital documents. Our platform provides a secure, transparent, and immutable way to verify and track document authenticity.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
          <ol className="space-y-4 mb-8">
            <li className="flex gap-4">
              <span className="font-bold">1.</span>
              <span>Upload your document to our platform</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold">2.</span>
              <span>Document is processed and a unique hash is generated</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold">3.</span>
              <span>Hash is stored on the blockchain for immutable verification</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold">4.</span>
              <span>Verify document authenticity anytime by uploading it to our platform</span>
            </li>
          </ol>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our mission is to create a more secure and transparent digital world by providing reliable document verification solutions. We believe in the power of blockchain technology to revolutionize how we handle and verify digital documents.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Technology Stack</h2>
          <ul className="space-y-2 mb-8">
            <li>• Blockchain Infrastructure</li>
            <li>• Smart Contracts</li>
            <li>• Advanced Cryptography</li>
            <li>• Secure File Handling</li>
          </ul>
        </div>
      </div>
    </div>
  );
}