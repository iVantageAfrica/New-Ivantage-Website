import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export function PageMotion({children}:{children:ReactNode}){const root=useRef<HTMLDivElement>(null);useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{const ctx=gsap.context(()=>{gsap.from('.page-enter',{y:22,opacity:0,duration:.7,stagger:.08,clearProps:'all'});gsap.utils.toArray<HTMLElement>('.reveal').forEach(el=>gsap.from(el,{y:24,opacity:0,duration:.7,clearProps:'all',scrollTrigger:{trigger:el,start:'top 94%',once:true}}));},root);return()=>ctx.revert();});return()=>mm.revert();},[]);return <div ref={root}>{children}</div>}
