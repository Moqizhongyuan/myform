"use client"
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import MenuItem from './MenuItem';
import Logo from './Logo';
import DoingIcon from './DoingIcon';
import Login from '../Login';

export default function Navigation() {
  const [activeItem, setActiveItem] = useState('box');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const menuItems = [
    { id: 'box', icon: Logo, label: '一个盒子' },
    { id: 'generate', icon: DoingIcon, label: '一键生成' },
    // { id: 'design', icon: DesignStudioIcon, label: '设计工坊' },
  ];

  const handleProfileClick = () => {
    setIsLoginOpen(true);
    setActiveItem('profile');
  };

  return (
    <>
      <nav className="h-full w-[70px] bg-[#1d1d1d] flex flex-col justify-between py-6 rounded-tr-[36px]">
        <div className="flex flex-col items-center space-y-6">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
            />
          ))}
        </div>
        <div className="mt-auto">
          <MenuItem
            icon={CgProfile}
            label="登录"
            onClick={handleProfileClick}
            active={activeItem === 'profile'}
          />
        </div>
      </nav>

      <Login 
        isOpen={isLoginOpen} 
        onClose={() => {
          setIsLoginOpen(false);
          setActiveItem('box');
        }} 
      />
    </>
  );
}