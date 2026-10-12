import banking from '@/assets/hero-products.jpg';
import property from '@/assets/property-project.jpg';
import construction from '@/assets/construction-project.jpg';
import rail from '@/assets/rail-project.jpg';

export type Product = { slug: string; name: string; summary: string; category: string; screenshots: { url: string; alt: string }[]; liveUrl?: string; features: string[] };
export type Company = { slug: string; name: string; shortName: string; sector: string; summary: string; cover: string; coverAlt: string; theme: string; logoUrl?: string; products: Product[] };
// Add verified official logo URLs and actual products here. Empty products are intentional: never invent delivered work.
export const companies: Company[] = [
 { slug:'imperial-homes', name:'Imperial Homes Mortgage Bank', shortName:'Imperial Homes', sector:'Banking & financial technology', summary:'Digital solutions for the mortgage and banking sector.', cover:banking, coverAlt:'Illustrative financial product concept', theme:'banking', products:[] },
 { slug:'homeco', name:'HomeCo Development', shortName:'HomeCo', sector:'Real estate & property technology', summary:'Digital experiences for property and real estate.', cover:property, coverAlt:'Illustrative property website concept', theme:'property', products:[] },
 { slug:'buildconnect', name:'BuildConnect', shortName:'BuildConnect', sector:'Construction technology & marketplace', summary:'Digital experiences for the construction ecosystem.', cover:construction, coverAlt:'Illustrative construction marketplace concept', theme:'construction', products:[] },
 { slug:'nigerian-railway', name:'Nigerian Railway Corporation', shortName:'Nigerian Railway', sector:'Digital solutions & enterprise technology', summary:'Technology for an essential transportation institution.', cover:rail, coverAlt:'Illustrative railway digital platform concept', theme:'rail', products:[] },
];
export const findCompany = (slug: string) => companies.find(c => c.slug === slug);
