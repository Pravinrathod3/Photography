import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DataTemplate from '../component/data';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 48) / 3; 
interface Template {
  id: string;
  image: string;
  category: string;
  isSelected: boolean;
}


type TabType = 'Home' | 'Videos' | 'Photography' | 'In action' | 'Commercial' | 'Ar Ads';

interface Tab {
  name: TabType;
  icon: keyof typeof Ionicons.glyphMap;
}

const tabs: Tab[] = [
  { name: 'Home', icon: 'home-outline' },
  { name: 'Videos', icon: 'videocam-outline' },
  { name: 'Photography', icon: 'camera-outline' },
  { name: 'In action', icon: 'flash-outline' },
  { name: 'Commercial', icon: 'star-outline' },
  { name: 'Ar Ads', icon: 'cube-outline' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('Photography');
  const [searchText, setSearchText] = useState('');
  const [promptText, setPromptText] = useState('');
  const [templates, setTemplates] = useState<Template[]>(DataTemplate);

  const handleTemplateSelect = (id: string, category: string) => {

    
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) =>
        template.id === id
          ? { ...template, isSelected: !template.isSelected }
          : template
      )
    );
  };

  const renderTemplateItem = ({ item }: { item: Template }) => (
    <TouchableOpacity
      className="rounded-xl overflow-hidden bg-gray-800 relative"
      style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
      onPress={() => handleTemplateSelect(item.id, item.category)}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: item.image }} 
        className="w-full h-full"
        resizeMode="cover"
      />
      {item.isSelected && (
        <View className="absolute inset-0 bg-[#00ff88]/30 items-center justify-center">
          <View className="w-8 h-8 rounded-full bg-[#00ff88] items-center justify-center">
            <Ionicons name="checkmark" size={20} color="#1a1a1a" />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#1a1a1a]">
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-[#1a1a1a]">
        <TouchableOpacity className="w-10 h-10 items-center justify-center">
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-white">Photography</Text>
        <TouchableOpacity className="w-10 h-10 items-center justify-center">
          <View className="w-8 h-8 rounded-full bg-gray-600" >
            <Image source={{ uri: 'https://i.pravatar.cc/300' }} className="w-full h-full rounded-full" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Tab Bar */}
      <View className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <TouchableOpacity
                key={tab.name}
                className="items-center mr-6 pb-2 relative"
                onPress={() => setActiveTab(tab.name)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={tab.icon}
                  size={20}
                  color={isActive ? '#00ff88' : '#888'}
                />
                <Text className={`text-xs mt-1 ${isActive ? 'text-[#00ff88]' : 'text-gray-500'}`}>
                  {tab.name}
                </Text>
                {isActive && (
                  <View 
                    className="absolute h-0.5 bg-[#00ff88]"
                    style={{ bottom: -13, left: 0, right: 0 }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View className="px-4 pt-4 pb-3">
          <View className="flex-row items-center bg-[#2a2a2a] rounded-xl px-4 py-3">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              className="flex-1 text-white text-sm ml-2"
              placeholder="Search for keyword 'flowers'..."
              placeholderTextColor="#666"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Prompt Input Box */}
        <View className="mx-4 mb-4 bg-[#2a2a2a] rounded-2xl border border-[#3a3a3a] p-4">
          <TextInput
            className="text-white text-sm min-h-[80px] mb-3"
            placeholder="Describe the scene around your product..."
            placeholderTextColor="#f5f5f5"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={promptText}
            onChangeText={setPromptText}
          />
          <View className="items-end">
            <TouchableOpacity 
              className="flex-row items-center px-4 py-2.5 rounded-lg"
              activeOpacity={0.8}
            >
              <Ionicons name="sparkles-outline" size={26} color="#00ff88" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Template Suggestions */}
        <View className="px-4 mb-6">
          <Text className="text-white text-s mb-3">
            Or try suggested templates
          </Text>
          <FlatList
            data={templates.filter(item => item.category === 'Photography')}
            renderItem={renderTemplateItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 8 }}
          />
        </View>

        {/* Monochrome Section */}
        <View className="px-4 mb-6">
          <Text className="text-white text-base font-semibold mb-3">
            Monochrome
          </Text>
          <FlatList
            data={templates.filter(item => item.category === 'Monochrome')}
            renderItem={renderTemplateItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 8 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}