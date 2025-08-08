'use client'
import React, { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ChevronLeft, ChevronRight, Calendar, Users } from 'lucide-react';
import styles from '../../styles/components/psotm.module.css';

interface CarouselItem {
  image: StaticImageData;
  title: string;
  name: string;
  division: string;
  month: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showThumbnails?: boolean;
}

export default function Carousel({ 
  items, 
  autoPlay = true, 
  autoPlayInterval = 5000,
  showThumbnails = true 
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, autoPlayInterval]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleThumbnailClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const currentItem = items[currentIndex];

  return (
    <div className={styles.carouselContainer}>
      {/* Main Carousel */}
      <div className={styles.carouselMain}>
        <div className={styles.carouselContent}>
          {/* Image Section */}
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src={currentItem.image}
                alt={currentItem.name}
                fill
                className={styles.mainImage}
                priority
              />
              <div className={styles.imageOverlay} />
            </div>
            
            {/* Navigation Arrows */}
            <button 
              className={`${styles.navButton} ${styles.navPrev}`} 
              onClick={handlePrev}
              disabled={isAnimating}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className={`${styles.navButton} ${styles.navNext}`} 
              onClick={handleNext}
              disabled={isAnimating}
            >
              <ChevronRight size={24} />
            </button>

            {/* Progress Indicators */}
            <div className={styles.progressIndicators}>
              {items.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.progressDot} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className={styles.contentSection}>
            <div className={styles.contentWrapper}>
              <div className={styles.badge}>
                <Calendar size={16} />
                <span>{currentItem.month}</span>
              </div>
              
              <h2 className={styles.title}>{currentItem.title}</h2>
              <h3 className={styles.name}>{currentItem.name}</h3>
              
              <div className={styles.divisionTag}>
                <Users size={16} />
                <span>{currentItem.division}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}