import React, { useState } from 'react';
import Image from 'next/image';

interface DesignProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DesignConfig {
  productType: string;
  brandName: string;
  boxColor: string;
  designStyle: string;
  flowerPattern: string;
}

const Design: React.FC<DesignProps> = ({ isOpen, onClose }) => {
  const [designConfig, setDesignConfig] = useState<DesignConfig>({
    productType: '香薰',
    brandName: 'Moments',
    boxColor: 'yellow',
    designStyle: 'INS风',
    flowerPattern: '大理石花纹'
  });

  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleStyleSelect = (style: string) => {
    setDesignConfig(prev => ({ ...prev, designStyle: style }));
  };

  const handleColorSelect = (color: string) => {
    setDesignConfig(prev => ({ ...prev, boxColor: color }));
  };

  const handlePatternSelect = (pattern: string) => {
    setDesignConfig(prev => ({ ...prev, flowerPattern: pattern }));
  };

  const handleGenerate = () => {
    // TODO: Implement generation logic
    console.log('Generating design with config:', designConfig);
  };

  return (
    <div 
      className="absolute inset-y-0 right-[0px] left-[230px] bg-gradient-to-br from-[#edf5cd] to-[#a3baae] flex items-center justify-center z-40"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-[800px] relative p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#1d1d1d] rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">K</span>
          </div>
          <h2 className="text-lg font-medium">一个盒子AI包装设计...</h2>
        </div>

        <div className="flex gap-8">
          {/* Left Side - Preview */}
          <div className="w-1/3 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">产品类型</h3>
              <div className="flex gap-2">
                <button 
                  className={`px-4 py-2 rounded-full text-sm ${
                    designConfig.productType === '香薰' ? 'bg-black text-white' : 'bg-gray-200'
                  }`}
                >
                  香薰
                </button>
                <button 
                  className={`px-4 py-2 rounded-full text-sm ${
                    designConfig.productType === 'Moments' ? 'bg-black text-white' : 'bg-gray-200'
                  }`}
                >
                  Moments
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">包装颜色</h3>
              <div className="flex gap-2">
                <button 
                  className="w-8 h-8 rounded-full bg-yellow-300 border-2 border-transparent hover:border-black"
                  onClick={() => handleColorSelect('yellow')}
                />
                <button 
                  className="w-8 h-8 rounded-full bg-gray-300 border-2 border-transparent hover:border-black"
                  onClick={() => handleColorSelect('gray')}
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">设计风格</h3>
              <div className="flex gap-2">
                <button 
                  className={`px-4 py-2 rounded-full text-sm ${
                    designConfig.designStyle === 'INS风' ? 'bg-black text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => handleStyleSelect('INS风')}
                >
                  INS风
                </button>
                <button 
                  className={`px-4 py-2 rounded-full text-sm ${
                    designConfig.designStyle === '简约' ? 'bg-black text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => handleStyleSelect('简约')}
                >
                  简约
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">花纹元素</h3>
              <div className="flex gap-2">
                <button 
                  className={`px-4 py-2 rounded-full text-sm ${
                    designConfig.flowerPattern === '大理石花纹' ? 'bg-black text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => handlePatternSelect('大理石花纹')}
                >
                  大理石花纹
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Chat */}
          <div className="w-2/3 bg-[#f8faf0] rounded-lg p-4">
            {/* AI Message */}
            <div className="flex gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="AI"
                  width={20}
                  height={20}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm mb-4">Hi👋, 我是你的包装设计AI助手，请回答以下问题，让我帮你完成自定义设计。</p>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm mb-2">你想要什么风格的盒子设计？</p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-[#e8ffd6] rounded-full text-sm">简约INS风</button>
                      <button className="px-3 py-1 bg-white border rounded-full text-sm">重回旧风</button>
                      <button className="px-3 py-1 bg-white border rounded-full text-sm">节日庆典风</button>
                      <button className="px-3 py-1 bg-white border rounded-full text-sm">其他（请输入）</button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm mb-2">你想要什么颜色的盒子设计？</p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-white border rounded-full text-sm">粉+白</button>
                      <button className="px-3 py-1 bg-[#e8ffd6] rounded-full text-sm">金+灰</button>
                      <button className="px-3 py-1 bg-white border rounded-full text-sm">其他（请输入）</button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm mb-2">请输入你的产品名称和产品品类。</p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-[#e8ffd6] rounded-full text-sm">产品名称：Moments</span>
                      <span className="px-3 py-1 bg-[#e8ffd6] rounded-full text-sm">产品品类：香薰</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="relative mt-auto">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="请输入..."
                className="w-full px-4 py-3 pr-12 rounded-lg border focus:outline-none focus:border-green-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="mt-6 w-32 px-6 py-2 bg-[#c3f53b] text-black rounded-full hover:bg-[#b5e48c] transition-colors mx-auto block"
        >
          生成设计
        </button>
      </div>
    </div>
  );
};

export default Design;