"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { NewProducts } from "@/components/sections/NewProducts";
import { Categories } from "@/components/sections/Categories";
import { Features } from "@/components/sections/Features";
import { Brands } from "@/components/sections/Brands";


export default function Home() {
  return (
    <>
      <HeroSlider />
      <NewProducts />
      <Brands />
      <Categories />
      <Features />
      
      
      
    </>
  );
}
