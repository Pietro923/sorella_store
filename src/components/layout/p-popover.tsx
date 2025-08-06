"use client"
import {  
  Mail,
  Instagram,
  Linkedin,
  Code,
  ExternalLink,
  Github,
  Heart
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Pietrobutton() {
return (
<Popover>
            <PopoverTrigger asChild>
              <button
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Información del desarrollador"
              >
                <Code className="w-4 h-4" />
                <span>Design by P</span>
              </button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-72 p-0 bg-gray-800 text-gray-200 rounded-xl shadow-xl border-0" 
              side="top" 
              sideOffset={10}
              align="center"
            >
              <div className="p-4 bg-gradient-to-r from-red-800 to-red-900 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">Pietro Bonacossa</h3>
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">Full Stack Dev</span>
                </div>
                <p className="text-red-100 text-sm mt-1">Desarrollo web personalizado</p>
              </div>
              
              <div className="p-4">
                <p className="mb-4 text-sm text-gray-300">
                  Especialista en desarrollo de aplicaciones web modernas con React, Next.js y Tailwind CSS.
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  <a 
                    href="https://pietrocode.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4 text-red-400" />
                    <span>Portfolio</span>
                  </a>
                  
                  <a 
                    href="https://github.com/Pietro923" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
                  >
                    <Github className="w-4 h-4 text-red-400" />
                    <span>GitHub</span>
                  </a>
                  
                  <a 
                    href="https://linkedin.com/in/pietrobonacossa" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
                  >
                    <Linkedin className="w-4 h-4 text-red-400" />
                    <span>LinkedIn</span>
                  </a>
                  
                  <a 
                    href="mailto:jpbonacossa@gmail.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 text-red-400" />
                    <span>Contacto</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/pietro_code/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
                  >
                    <Instagram className="w-4 h-4 text-red-400" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
              
              <div className="p-3 bg-gray-900 rounded-b-xl text-xs text-center flex items-center justify-center gap-1 text-gray-400">
                <span>Hecho con</span>
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                <span>y Next.js</span>
              </div>
            </PopoverContent>
          </Popover>
)}