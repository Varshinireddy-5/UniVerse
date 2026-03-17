import { useState } from 'react';
import { motion } from 'motion/react';
import {
  X, Upload, Mic, Video, FileText, Sparkles, Download, Share2,
  BookOpen, Save, Copy, CheckCircle, ArrowLeft
} from 'lucide-react';

export function NotesGeneratorModal({ onClose }: { onClose: () => void }) {
  const [inputMethod, setInputMethod] = useState<'upload' | 'record' | 'link'>('upload');
  const [generatingNotes, setGeneratingNotes] = useState(false);
  const [notesGenerated, setNotesGenerated] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('detailed');
  const [selectedFormat, setSelectedFormat] = useState('structured');

  const handleGenerate = () => {
    setGeneratingNotes(true);
    setTimeout(() => {
      setGeneratingNotes(false);
      setNotesGenerated(true);
    }, 3000);
  };

  const generatedNotes = `# Data Structures - Binary Trees

## Introduction
Binary trees are hierarchical data structures where each node has at most two children, referred to as left child and right child.

## Key Concepts

### 1. Tree Terminology
- **Root**: The topmost node in a tree
- **Parent**: A node that has child nodes
- **Leaf**: A node with no children
- **Height**: Number of edges on the longest path from root to leaf
- **Depth**: Number of edges from root to a specific node

### 2. Types of Binary Trees
**Complete Binary Tree**: All levels filled except possibly the last level, which is filled from left to right.

**Full Binary Tree**: Every node has either 0 or 2 children.

**Perfect Binary Tree**: All internal nodes have 2 children and all leaves are at the same level.

### 3. Tree Traversals
- **Inorder (Left-Root-Right)**: Used for BST to get sorted order
- **Preorder (Root-Left-Right)**: Used to create a copy of tree
- **Postorder (Left-Right-Root)**: Used to delete tree
- **Level Order**: Breadth-first traversal

## Time Complexity
- Search: O(log n) for balanced trees, O(n) worst case
- Insertion: O(log n) for balanced trees
- Deletion: O(log n) for balanced trees

## Applications
- File system organization
- Expression parsing
- Database indexing
- Huffman coding`;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-50 rounded-2xl border border-blue-200 w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-200">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-blue-200/50 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-blue-900" />
            </button>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-900">AI Notes Generator</h2>
              <p className="text-sm text-blue-700">Transform lectures into comprehensive study notes</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-blue-200/50 rounded-lg transition-colors">
            <X className="w-5 h-5 text-blue-900" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          {/* Left Panel - Input */}
          <div className="w-1/2 border-r border-blue-200 p-6 overflow-y-auto">
            <h3 className="text-blue-900 font-bold mb-4">Input Source</h3>
            
            {/* Input Method Selection */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <button
                onClick={() => setInputMethod('upload')}
                className={`p-4 rounded-xl border transition-all ${
                  inputMethod === 'upload'
                    ? 'bg-gradient-to-br from-blue-400 to-cyan-400 border-blue-300 text-white'
                    : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-100'
                }`}
              >
                <Upload className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs">Upload File</p>
              </button>
              <button
                onClick={() => setInputMethod('record')}
                className={`p-4 rounded-xl border transition-all ${
                  inputMethod === 'record'
                    ? 'bg-gradient-to-br from-blue-400 to-cyan-400 border-blue-300 text-white'
                    : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-100'
                }`}
              >
                <Mic className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs">Record Audio</p>
              </button>
              <button
                onClick={() => setInputMethod('link')}
                className={`p-4 rounded-xl border transition-all ${
                  inputMethod === 'link'
                    ? 'bg-gradient-to-br from-blue-400 to-cyan-400 border-blue-300 text-white'
                    : 'bg-white border-blue-200 text-blue-700 hover:bg-blue-100'
                }`}
              >
                <Video className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs">Video Link</p>
              </button>
            </div>

            {/* Upload Area */}
            <div className="bg-white border-2 border-dashed border-blue-300 rounded-xl p-8 mb-6 hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <p className="text-center text-blue-900 mb-2">Drop files here or click to browse</p>
              <p className="text-center text-xs text-blue-600">
                Supports PDF, PPT, DOCX, MP3, MP4 (Max 100MB)
              </p>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <div>
                <label className="text-blue-900 text-sm mb-2 block font-semibold">Notes Style</label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-blue-200 rounded-xl text-blue-900 focus:outline-none focus:border-blue-400"
                >
                  <option value="detailed">Detailed & Comprehensive</option>
                  <option value="concise">Concise & Brief</option>
                  <option value="bullet">Bullet Points</option>
                  <option value="visual">Visual with Diagrams</option>
                </select>
              </div>

              <div>
                <label className="text-blue-900 text-sm mb-2 block font-semibold">Format</label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-blue-200 rounded-xl text-blue-900 focus:outline-none focus:border-blue-400"
                >
                  <option value="structured">Structured Headings</option>
                  <option value="cornell">Cornell Notes</option>
                  <option value="outline">Outline Format</option>
                  <option value="mindmap">Mind Map Style</option>
                </select>
              </div>

              <div className="flex items-center gap-3 p-4 bg-purple-100 rounded-xl border border-purple-200">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-purple-900 text-sm font-semibold">AI Enhancement</p>
                  <p className="text-xs text-purple-700">Add examples, analogies & key points</p>
                </div>
                <label className="ml-auto relative inline-block w-12 h-6">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-full h-full bg-purple-200 peer-checked:bg-purple-500 rounded-full transition-colors"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generatingNotes}
              className="w-full mt-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {generatingNotes ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Notes...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Notes
                </>
              )}
            </button>
          </div>

          {/* Right Panel - Output */}
          <div className="w-1/2 p-6 overflow-y-auto bg-white/50">
            {!notesGenerated ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <BookOpen className="w-20 h-20 text-blue-400 mb-4" />
                <h3 className="text-xl text-blue-900 font-bold mb-2">Your Notes Will Appear Here</h3>
                <p className="text-blue-700 text-sm">Upload content and click Generate to create AI-powered notes</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-blue-900 font-bold">Generated Notes</h3>
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                      <Copy className="w-4 h-4 text-blue-900" />
                    </button>
                    <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-blue-900" />
                    </button>
                    <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4 text-blue-900" />
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-blue-200">
                  <pre className="whitespace-pre-wrap text-blue-900 text-sm leading-relaxed font-sans">
                    {generatedNotes}
                  </pre>
                </div>

                <div className="mt-6 p-4 bg-green-100 rounded-xl border border-green-300 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-green-900 font-semibold text-sm">Notes Generated Successfully!</p>
                    <p className="text-xs text-green-700">Ready to save and study</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}