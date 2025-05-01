"use client";

import { ArrowRight, FileCheck, Shield, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-500 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Secure Document Verification Through Blockchain
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Ensure the authenticity and integrity of your documents with our cutting-edge blockchain verification system
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/verify">
                <Button size="lg" className="gap-2">
                  Verify Document <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/upload">
                <Button size="lg" variant="outline" className="gap-2">
                  Upload Document <FileCheck className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-500">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {/* Feature 1 */}
      <div className="p-6 bg-card rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <Shield className="w-12 h-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-2">Immutable Security</h3>
        <p className="text-muted-foreground">
          Documents are verified using blockchain technology, ensuring tamper-proof security and authenticity.
        </p>
      </div>
      {/* Feature 2 */}
      <div className="p-6 bg-card rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <Clock className="w-12 h-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-2">Instant Verification</h3>
        <p className="text-muted-foreground">
          Verify documents in seconds with our efficient blockchain-based verification system.
        </p>
      </div>
      {/* Feature 3 */}
      <div className="p-6 bg-card rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <FileCheck className="w-12 h-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
        <p className="text-muted-foreground">
          Seamlessly integrate our verification system into your existing workflow.
        </p>
      </div>
    </div>
  </div>
</section>
</main>
  );
}