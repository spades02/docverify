"use client";

import { useEffect, useState } from "react";
import { getContract } from "@/utils/contract";
import Link from "next/link";
import { FileCheck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import useUserRoles from "@/hooks/useUserRoles";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    account,
    walletConnected,
    isOwner,
    isUploader,
    connectWallet,
  } = useUserRoles();

  return (
    <nav className="bg-blue-500 backdrop-blur supports-[backdrop-filter]:bg-blue-500 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <FileCheck className="w-6 h-6" />
            <span className="font-bold text-lg">DocVerify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-foreground">
              Home
            </Link>
            <Link href="/verify" className="text-white hover:text-foreground">
              Verify
            </Link>
            {isUploader && <Link href="/upload" className="text-white hover:text-foreground">
              Upload
            </Link>}
            {isOwner && (
              <Link href="/uploader-manager" className="text-white hover:text-foreground">
                Uploader Manager
              </Link>
            )}
            <Link href="/about" className="text-white hover:text-foreground">
              About
            </Link>
            <Button onClick={connectWallet}>
              {walletConnected ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
            </Button>
          </div>

          {/* Mobile Navigation Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-foreground" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/verify" className="text-white hover:text-foreground" onClick={() => setIsOpen(false)}>
                Verify
              </Link>
              <Link href="/upload" className="text-white hover:text-foreground" onClick={() => setIsOpen(false)}>
                Upload
              </Link>
              {isOwner && (
                <Link href="/uploader-manager" className="text-white hover:text-foreground" onClick={() => setIsOpen(false)}>
                  Uploader Manager
                </Link>
              )}
              <Link href="/about" className="text-white hover:text-foreground" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Button onClick={connectWallet} className="w-full">
                {walletConnected ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
