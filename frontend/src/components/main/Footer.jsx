import React from 'react';
import { Trophy, Facebook, Instagram, Send, Mail, Phone, Shield, ChevronRight, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Trophy className="w-6 h-6 text-gray-900" />
              </div>
              <span className="text-2xl font-bold">GoProof</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              A platform for self-improvement through challenges. Become a better version of yourself every day with our community.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  Contacts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  Help
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal Information</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 GoProof. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@goproof.ua
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +380 (XX) XXX-XX-XX
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}