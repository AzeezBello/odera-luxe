import { Header } from '@/components/Header';
import { WhatsAppStore } from '@/components/WhatsAppStore';
import { getAvailableProducts } from '@/lib/products';
import { ODERA_BESPOKE, ODERA_COLLECTIONS, ODERA_HERO, ODERA_JOURNAL, ODERA_LOOKS, ODERA_SIGNATURE } from '@/lib/media';

export const dynamic = 'force-dynamic';

export default function Home() {
  const products = getAvailableProducts();
  const featured = products.filter(p => p.featured).slice(0, 6);
  const shopProducts = featured.length ? featured : products.slice(0, 6);
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');
  return <main id="top">
    <Header />
    <section className="hero" style={{backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.72),rgba(0,0,0,.18)),url("${ODERA_HERO}")`}}><div className="container heroInner"><div className="eyebrow">Urban African</div><h1 className="serif">Bespoke<br/>Tailoring</h1><p>Timeless craftsmanship. Contemporary African identity. ODERA Luxe creates tailored pieces for the modern individual — bold, refined and authentic.</p><a className="btn" href="#collections">Explore Collections <span>→</span></a></div></section>

    <section className="section" id="about"><div className="container signature"><div className="signatureCopy"><div className="eyebrow">The ODERA Signature</div><h2>Tailored for presence.</h2><p className="body">At ODERA Luxe, clothing is more than what you wear — it is how you move, how you are remembered, and the story you tell. Our bespoke pieces are designed for those who lead, create, and make an impact.</p><a className="eyebrow" href="#bespoke">Our Story&nbsp; →</a></div><div className="sigImg" style={{backgroundImage:`url("${ODERA_SIGNATURE}")`}}/><div className="collections" id="collections"><a className="collection" style={{backgroundImage:`url("${ODERA_COLLECTIONS[0]}")`}} href="/collections/men"><div><div className="eyebrow">Men</div><h3>Modern tailoring</h3><span className="eyebrow">Explore Collection →</span></div></a><a className="collection" style={{backgroundImage:`url("${ODERA_COLLECTIONS[1]}")`}} href="/collections/women"><div><div className="eyebrow">Women</div><h3>Power & form</h3><span className="eyebrow">Explore Collection →</span></div></a></div></div></section>

    <section className="dark" id="bespoke"><div className="bespoke"><div className="bespokeImg" style={{backgroundImage:`url("${ODERA_BESPOKE}")`}}/><div className="process"><div className="eyebrow">The Bespoke Experience</div><h2 className="sectionTitle">Your vision. Our craft.</h2><div className="processGrid"><div className="processItem"><strong>01. Consultation</strong><span>Share your style, needs and inspiration.</span></div><div className="processItem"><strong>02. Design</strong><span>We create a custom direction for you.</span></div><div className="processItem"><strong>03. Fitting</strong><span>Perfecting every detail for your ideal fit.</span></div><div className="processItem"><strong>04. Finish</strong><span>Your piece is handcrafted and delivered with care.</span></div></div></div></div></section>

    <section className="section"><div className="container"><div className="looksHead"><div><div className="eyebrow">Featured Looks</div><h2 className="sectionTitle">Modern African<br/>Elegance</h2></div><a className="eyebrow" href="#shop">View All Collections →</a></div><div className="looks">{ODERA_LOOKS.map((image,i)=><a key={image} className="look" style={{backgroundImage:`url("${image}")`}} href={shopProducts[i]?.slug ? `/look/${shopProducts[i].slug}` : '#shop'} aria-label="View ODERA look"/>)}</div></div></section>

    <section className="section shop" id="shop"><div className="container"><div className="shopHead"><div><div className="eyebrow">ODERA WhatsApp Store</div><h2 className="sectionTitle">Shop the edit.</h2><p className="body">Browse available pieces, choose your size or customization, then continue your order directly with our team on WhatsApp.</p></div><a className="btn darkbtn" href={number ? `https://wa.me/${number}?text=${encodeURIComponent('Hello ODERA Luxe, I would like to book a bespoke consultation.')}` : '#contact'} target={number ? '_blank' : undefined} rel={number ? 'noreferrer' : undefined}>Book a fitting →</a></div><WhatsAppStore products={shopProducts} /></div></section>

    <section className="section journal" id="journal"><div className="container"><div className="eyebrow">Journal</div><h2 className="sectionTitle">Style. Culture. Craft.</h2><div className="journalGrid">{ODERA_JOURNAL.map((image,i)=><article className="journalCard" key={image} style={{backgroundImage:`url("${image}")`}}><div><div className="eyebrow">{['Craft','Bespoke','Lagos'][i]}</div><h3 className="serif">{['The rise of African tailoring','From fabric to final fit','A city of style and possibility'][i]}</h3></div></article>)}</div></div></section>

    <footer className="footer" id="contact"><div className="container"><div className="footerTop"><div><div className="logo">ODERA<small>LUXE</small></div><p className="body" style={{color:'#888'}}>Urban African bespoke tailoring.<br/>Lagos, Nigeria.</p></div><div><div className="eyebrow">Start a conversation</div><p><a href={number ? `https://wa.me/${number}` : '#'} target={number ? '_blank' : undefined} rel={number ? 'noreferrer' : undefined}>WhatsApp Concierge →</a></p><p><a href="https://instagram.com/odera.ng" target="_blank" rel="noreferrer">Instagram @odera.ng →</a></p></div></div><div className="footerBottom"><span>© {new Date().getFullYear()} ODERA Luxe</span><span>Crafted in Lagos · Made for presence</span></div></div></footer>
  </main>;
}
