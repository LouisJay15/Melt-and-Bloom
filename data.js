// Melt & Bloom product + content data. Plain JS, exposes window.MB

(function () {
  const IMG = {
    midnight: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0j7UdUz9IDXx0tJEyON8J6NauRWy2H5WX195--3VcGGbooOtu7Ae4HKjcEv1C8YGvfzGRSQsFp-KeQPxVw5cdRhOEqUngbRdmRZwTd9kKuCa0enjhO3fR5vfwpovFBo1Sm2IrEQ1E3V2zC4VybA9ud4H2fVCr4C18kpCd2We3yezqLQg-KnhcjuHizHQFWyTH12BaS-MfSydE0WZKriRqVr7sKOlqtWOd12BoQSp0GDZcWPcPXbTTruV7B8TeqAgxK1XJWh4Dl329',
    smoked: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOaDa4g0DUvG_yOdgdLPyh7bAE8c7GK35fCxLMksVLGSH-brX5lnNNMaFlsTH4ebY5chkbx6b0gldhkcwRg3LZO1nd3GT6tnIKcYjFYfRxiXcYFe0e9oo3GUpCHYfjw2qfaG-PVsmPEXmIm6FezONo5R9_ViGH5QuD3FRzighsAeer_Z94YU3vBn3TjBJN6FH8gtBcCp9AOoANL6EfHRx6wKUuMhGqg5iFhi4uNPhQIuCi7b9Tj9yjwhMYL7MvvXHOvX3-ObYxZUvp',
    eucalyptus: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSf0K7sI9n8CwpDO0aiPO3XlKosWnoiPMNeFuSVdSC5ogMDOyTJzl01RnC8igjj61K9QrEbIkJavz1U5Ae9BpxdKEwOKjJzF40CMyx_fz4-IjJQxfiBt42jj9hwkHYdrNrvyIbbIv7tV1P6uyMqN2Khq2geIE86p4BEK3YcMbXm8jXo3sH-l01zCoDBEIPlWjbUxyzo2-V1chXN6c4OeqCuXz3HGAZxhviOBBnwUYJW7yeTxUhd-ePP8tBYIqyFa32ZEELNt3QhweC',
    quietevening: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpSwwuIA0e5Y9ziciGwx91soB9wxsTmoyOzSoIuPA-Y6QS2zL_hJR8rs7VYuHJfmUoJ4uPfHTMEg495Dc4U8QhcJ22SGt5EpFZxvQetvICRinH461EkFaapIMD0-qT-lp5ZyyCiIKmlZSxnKjv03zgAr9bhO5gcgAEho_XWNT1usW53TToSvrrSARFZ52wfSdmCfIQ-iM4LTOklgIZQ_8VcO7FDyylloMEdf-d7xV83oCnWO4TlF7tg5-tJgCqyRe7UcXYPLB7Ei08',
    vanilla: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdRUztFWnRvCJT51gSjqL0KS0EqiJcR8EIUtuJfsViSuC9AOy0SYLWQAYgQikWy0gOXI3jXtk7NOB60lXbvDYrc5WCWjWOELRIz9M_S2bmbJIlXE4J_8Q-IIiDOXURvdIHJx3r6v3KiZ0Q6ygS9lA_6ZdjaVp2Y1gTIDc_jTVyNw-PnuD21c-4mt1pY9-FVhyuM3KZ_eNGAAtTAdBb5zoQlprpxgIkn7Zye0XCkTw8Y2gd0w62ZsJRKShnT8qJIu8946OFiDzkhKBT',
    midnightWoods: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBA_-sAAMjilOZkLfk9E9dTlwW8Sw2VRyqm3W22mGBnyweg8wZ4EBdMLr3zR4ptMHJMVV8JbhvJ7-8G4kVfiOjPH2W9rLjNlO-THmuMV5sqHQOeYlBt6vNIt2eOVwGrss6WGOaUdTmcPVuoF-FDOqZe02SLvFiVIcF5W9bdpHP8C-iRIzyzsrfQqvbZtwqmAqZtDH8gtdPeeJR8w23ZVrLjgkJpB4_gD51J-QRa5VGwqFoDlGnP6-w1YNKp9wxt0xlM97T_G1CY1MY',
    seasalt: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMKEPfSe00FB05z1TDmQ0qiy1y-0khjxN_4F55YlP_8SAnMUjLBSC_g6UXl0QwCQp7LXYQRFhKaOkdE7pIz5Inz-Q2bqjtnemBbe9WDTm-3byUVCyMYzzxAY0YA4Tbw5Dm4ukEm3yHoPjz4kRIz50WXps3_1WvBk4AXVPjxG90iLBVNkNnpOWe3BLZKxETKSm39rsmwp1wJFM12r_L0NFkpUEKN8FqocsCjP1p0nyDOSnx5eqsFGf6MvSx-kjXcczVhp3lj1pBLK0P',
    hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzA2VW2I6uo-KQwHLCPimZBain8odOSVuJm51vntqdQAQt7mEtk328os6JGhbRdrwu0m0Dq1MITqxVMlrlm4R9XAXGB7FEAAaJREo6jxPgmR2TgZ4VWIrVyt_gO6ubBR9_udC3-tSjoTCr-LSwIyCiOxD7k6nkvjLB2M_VkFa5tF3dBeAdKyktxHomXUOuY2zu4m7_aldOrfzG9B54dkRrc9wpCZPdg38ZcKcS-MPz7yXhvW9dVERnb7-w1KHu_u0c328qWdFScVrv',
    crafting: 'assets/about/studio-supplies.jpg',
    pouring: 'assets/about/wax-pouring.jpg',
    linen: 'assets/about/founder-apron.jpg',
    g1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs7OCdPPmMHJIyj6_QSRBgT8eW8On087s20VShBqbg7R1I3mSkzWxxBQKcqNYyDjLKNL1fztRhlcxc9XS5vaWfoldZ0pOw3v9kK2qUk8Df2N8AWa5H2uJQXJJ3MMry0elsOwjORhFsB2jx08CnZzCImd9cW9XHJrIFbp5yYpuRVrsqFNsbWrDAeQbYCbdiq3OWoGhepW50PD4zPCk5RwIJMqk7iMUOu2yFe3rUmmTt3aVpWVFF01Sv_mhNmEVbpK6mUCRLM2NKi8nJ',
    g2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYJ0YRB6d_zQjZAj2yC_c1OQuBN3tSnQE3VrDZ8u53JwxlNZo1Y42CFzP4opRcYNCaLXcO0hJgCW1Emj5A-iPDKsP0cwikVWu5rkJZ3LUeJsTaJCVyJPB3FG-TiTNa4xNo3IK7whLSsSDAPXH8mkqYRymzbWwdecME_EX-KWrQ1xJIVUBAYtCUHDmq5A9eTJ5lldDekMvCznNjMuiP2PpfGsTG13Eg2VJ4koa_rvdCHFM2tE6NCEOkcTsTCFAIS13GMVFzCcaTXKlR',
    g3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD50FnJLKDaHu-ScUygaXJ4z9MnqKsZWjl86IGS9akX3Aje3yK51RpYLSTFCTTeUwsZiT_6SraIjjBBXKAoJ-vUUrScUTyjTbUYHXzHWmtObMxYuDnfFkrqpAtg9D0Q89wg5jNo8n-seGhOMWUQimyXA0FjIivFjKEiWmHjyl01bYovcc6Is1D95yF1GmmPIDTGwt9xIqWqxEe7HfZlvC5QgK_v98j-753B7238WPTnBQXPM5y53Xvgu77rJHB6LGhpWWCf4wmmlh_y',
    g4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgJPieWJE49BqW7_DLdr2B6-M_jLFhWMDxf2zEQKsZqV6WXMYjitHBDubuZcEeOkPeQodrnFCooGzwDAw3kOGHxeJ5tFHpKGeABeUEXs2JG0uoyPkGZjwsaE_z7ESME32MYXFlXnnO4mLAD-LaqmHBIxDKfG76Ie7Is29SR-kdISUAvtkXROjqADQYBMYXwZ8RUxhf_QOrDgldIz6tvMEBHMZlOmz3YgFy_ot0yO_ws67Q5Yj-YqSpWMghDgA633yNFaTUcFjzaKK_',
    g5: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNKdLfBK2jSLcSotzbGDOyKcPznFFPjLGKNce8dqm_fd7VlKdC_ERlzINQsfK4CUa3iV7MujkVLfGQoL-kQyyYwNNoox0hov413ORuIN1W02wOxkit0ucZqOPZRbfBkM_wJ3Gj1m_w02MHlZGf9mtNwe3VPWC1o-nPsHtAw_Qo3b0XRi608o9l_wrgojUzgyUlVEkIUv7Asss2Z0-3lZ-TaF8RP8-bMHrwy5Ge90Gm3WJRbv0S-7itLTg7bwFhmr6ClKss0bopOu3W',
    g6: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkHXoRdCvzjYS6dKuxmpnHZ_UtTB4a5NzBMPlytDXz5onTy-O9WGVxNnO97nx5P3VMH9yBjSTeefxBt2QW7LjZ1TUYGcNKpTNvlxTBVpTIZeN1P8EuZv-ZD68_9ZLkegL5vYyDbHQMJ73l9W0xuJ9aIYO0WhNNhShijdTyhmfJcAfaNPk66zF5lrek2dFBtDwcthJZcF7UdbEAMCJ6rAw0aazn0O2zoTDUH1vfWUjDVhWUm3KHKNtTj4tmXsmuQRe4ShkBVk_gXd3X',
    g7: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAymknQMBnkDfoMUbxTPPpaZrz9tcM_Md-5jlkYbW3b-CALLj_xG7GCQcWUW_7FREg8pNT8pdJhOaPF3DlvQdgjITGzSBdce4tTQH-dm_B7_uvF6_A9fUnZlTZQXZNesXFaiqFNdPlBf9qdrd99Oj1jNIhgDSK8-hJHL-f1eyN9eCKa51Zw66wuI0IZEThuv3N-USQelNo5uoxwDVblZm4fpXaaB7WdjR7Rqr2aTIEXnwyf-LZ6TBVHLMlT-C4AtOUc8C-4Ul64OI3_',
    g8: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfvaLoGy11GHOxOM0IIbTP3XTCJhq4pzpQEx38Ju57YP0dONpN6sh1aForrZC1LfnMAYGpWJeroQp8HhvHuRW1QlSg6RglfxQpAMZRcfnE0dlq1O1F0UZnNLgPxbqrPi2i33yIUEUkdcSgB1-eZzAuRf1ieD5bAQ-ot-PaR-Eu157s3g68pZs2ks8mLMRDJXdXrEK0pW8Oa8QG80bL2A6xpGtg0pNbRzugS9I8kNmEqLlgjpKzc8P3M4K4fEVe2eFm3MiWjiJaN8R8',
    amber: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC43ofRphG9JxedPH-mf86rSyHgWQJW9FHx1MEcxAFLtuiauAYsLm6VEHjZSXPxR6pXwp5Rh0wk6ArNLynuTgJFZ-gIqM4h2Zn1-l7_Z3i0e3vLU5UB8OctLxP1IZmVpkYEfPKYg_C8jzahNdITcwCERxc9V3r0Ltr2w1W3Yey0dYBXWh4SyaaJ4if1YLSTTNxZQQr1hcJCsziLt3fpCaHZSNDn4MyUsLVNB6cBIbabgkk3qmlCVt3S3VXm2ZH3QU8a5cI0vicYT7JD',
    diffuser: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5f6gkxeeq2OP6u_w8NCrTA8RGzH4ZNB2lDLJXkL8hWjG5Mxgnl3YZgk3oixNRBB4moriA5kt5gfe8MaXJYIeDnUAeIiW3bi77auQ3mDwt48TtK93F6o2aVmX59eBr-VilfYaos6YYslsZQ5w6NRP3M_9o8Bp5cosYHzS64h-XWSJMGPntD6PUvsmED5Ea0_6jzVLur3ofoDsq6nNK3E-wMA7k3-_hhZ84daH-gUvsDl2xHNeWjEVrtvM3wrSGl7q4bUG8iH7w9JSs',
    discovery: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiBe3OHf0Qqs-V2dSEdvRXL7pDbYdZpaYVa3dvOznqgXyN3BPM7VjtPoAueds6Rczi8II8JSUTqOgCG-2ik0hRg_VSKA8v53RtAuZgkWU3pTAAH6XKEaMLCRC2yK4wsGrfhs3o0CAvgkKxPD10ZIckzyhxeGz7zDxSLr5tLgJFAPnNHG3VhBBCsSqSPMSO_ldDDuEJeMOEF3oljXnagbPEyzXt3z6LaIxRrHxa11fbKK6HNMK8qqYZzEJe3fFIuN_5vK2m_r6stwZ9',
    pouring2: 'assets/about/pouring-studio.jpg',
    arranged: 'assets/about/smoke-extinguish.jpg',
  };

  const products = [
    { id: 'midnight-jasmine', name: 'Midnight Jasmine', tagline: 'A bloom that opens after dark.', price: 450, img: IMG.midnight, family: 'Floral', notes: { top: ['Bergamot', 'Black Pepper'], heart: ['Jasmine Sambac', 'Tuberose'], base: ['Vetiver', 'Musk'] }, burn: 48, wax: 'Coconut · Soy', wick: 'Cotton', size: '220g', desc: 'Heady florals folded into smoke and night air. Light it when the day is done and you need the room to soften.' },
    { id: 'smoked-sandalwood', name: 'Smoked Sandalwood', tagline: 'Resinous, slow-burning, grounded.', price: 520, img: IMG.smoked, family: 'Woody', notes: { top: ['Cardamom', 'Saffron'], heart: ['Sandalwood', 'Cedar'], base: ['Oud', 'Amber'] }, burn: 52, wax: 'Coconut · Soy', wick: 'Wood', size: '240g', desc: 'A library hush, polished wood, ember at the edge. For the chair you read in, the desk you write at.' },
    { id: 'eucalyptus-breeze', name: 'Eucalyptus Breeze', tagline: 'Cold morning, open window.', price: 280, img: IMG.eucalyptus, family: 'Fresh', notes: { top: ['Eucalyptus', 'Mint'], heart: ['Rosemary', 'Sage'], base: ['White Tea', 'Cedar'] }, burn: 30, wax: 'Soy', wick: 'Cotton', size: '120g', desc: 'A clear, mentholic lift. Best on the morning of a long week, beside a window cracked open.' },
    { id: 'quiet-evening', name: 'Quiet Evening', tagline: 'Tallow, fig leaf, fading light.', price: 450, img: IMG.quietevening, family: 'Woody', notes: { top: ['Fig Leaf', 'Black Tea'], heart: ['Tobacco Flower', 'Hay'], base: ['Tonka', 'Suede'] }, burn: 48, wax: 'Coconut · Soy', wick: 'Wood', size: '220g', desc: 'The first hour after the sun goes. Soft, slightly sweet, and entirely yours.' },
    { id: 'vanilla-bean', name: 'Vanilla Bean', tagline: 'Cream, not candy.', price: 340, img: IMG.vanilla, family: 'Warm', notes: { top: ['Bergamot'], heart: ['Madagascar Vanilla', 'Almond Milk'], base: ['Tonka', 'Sandalwood'] }, burn: 40, wax: 'Coconut · Soy', wick: 'Cotton', size: '180g', desc: 'A grown-up vanilla — milky, faintly bitter, never sugared. Wear it as a room and it suits you.' },
    { id: 'midnight-woods', name: 'Midnight Woods', tagline: 'Pine pitch and cold air.', price: 380, img: IMG.midnightWoods, family: 'Woody', notes: { top: ['Juniper', 'Black Pepper'], heart: ['Pine', 'Cypress'], base: ['Smoked Cedar', 'Vetiver'] }, burn: 48, wax: 'Coconut · Soy', wick: 'Wood', size: '220g', desc: 'A walk through the treeline at dusk. Damp earth, resin on your hands, somebody\u2019s fire two clearings over.' },
    { id: 'sea-salt-sage', name: 'Sea Salt & Sage', tagline: 'Air after rain on stone.', price: 340, img: IMG.seasalt, family: 'Fresh', notes: { top: ['Sea Salt', 'Lemon Peel'], heart: ['Sage', 'Geranium'], base: ['Driftwood', 'White Musk'] }, burn: 40, wax: 'Soy', wick: 'Cotton', size: '180g', desc: 'Off-season seaside. Quiet, mineral, slightly green at the edges.' },
    { id: 'amber-moss', name: 'Amber & Moss', tagline: 'Forest floor, late afternoon.', price: 460, img: IMG.amber, family: 'Woody', notes: { top: ['Bergamot', 'Birch'], heart: ['Oakmoss', 'Patchouli'], base: ['Amber', 'Labdanum'] }, burn: 48, wax: 'Coconut · Soy', wick: 'Cotton', size: '220g', desc: 'Deep amber softened by damp moss. Heavy, generous, the candle equivalent of a wool blanket.' },
    { id: 'reed-diffuser', name: 'Reed Diffuser \u2014 Linen Sky', tagline: 'Continuous, quiet scent.', price: 380, img: IMG.diffuser, family: 'Fresh', notes: { top: ['Sea Air'], heart: ['White Linen', 'Iris'], base: ['Musk'] }, burn: 0, wax: 'Diffuser oil', wick: 'Rattan reeds', size: '200ml', desc: 'For rooms that should always smell of something. Refillable; reeds last six months.' },
    { id: 'discovery-set', name: 'Discovery Set', tagline: 'Three minis, one weekend.', price: 290, img: IMG.discovery, family: 'Sets', notes: { top: ['Varies'], heart: ['Varies'], base: ['Varies'] }, burn: 12, wax: 'Coconut · Soy', wick: 'Cotton', size: '3 \u00d7 40g', desc: 'Three travel-size tins to find the scent that fits the room.' },
  ];

  const gallery = [
    { src: 'assets/gallery/01-two-clear-candles.jpg', ratio: '2/3', caption: 'Pair \u00b7 No. 01' },
    { src: 'assets/gallery/04-marble-pink.jpg', ratio: '3/2', caption: 'Bloom \u00b7 Studio still life' },
    { src: 'assets/gallery/02-candle-books.jpg', ratio: '2/3', caption: 'Reading hour \u00b7 Wilde + grapefruit' },
    { src: 'assets/gallery/08-three-coloured.jpg', ratio: '3/2', caption: 'Edition 04 \u00b7 Pour day' },
    { src: 'assets/gallery/05-shelf-lit.jpg', ratio: '2/3', caption: 'On the shelf \u00b7 Late afternoon' },
    { src: 'assets/gallery/07-roses-slate.jpg', ratio: '3/2', caption: 'Dried roses \u00b7 Slate' },
    { src: 'assets/gallery/09-amber-glow.jpg', ratio: '2/3', caption: 'Amber hour' },
    { src: 'assets/gallery/11-smoke-bw.jpg', ratio: '3/2', caption: 'After-burn \u00b7 No. 02' },
    { src: 'assets/gallery/03-holding-lit.jpg', ratio: '3/2', caption: 'In hand \u00b7 Workshop' },
    { src: 'assets/gallery/06-flatlay-trio.jpg', ratio: '2/3', caption: 'Trio \u00b7 Lavender pour' },
    { src: 'assets/gallery/12-daisies.jpg', ratio: '3/2', caption: 'Chamomile morning' },
    { src: 'assets/gallery/10-cotton-still.jpg', ratio: '3/2', caption: 'Cotton \u00b7 Linen Sky' },
  ];

  const tiers = [
    { id: 'essential', name: 'The Essential', price: 350, badge: null, lede: 'One candle. Pick a scent each month.', items: ['1 \u00d7 220g candle', '~48 hour burn', 'Free shipping over R500', 'Skip or pause anytime'] },
    { id: 'sanctuary', name: 'The Sanctuary', price: 950, badge: 'Most chosen', lede: 'Three complementary scents, hand-curated for the season.', items: ['3 \u00d7 220g candles', 'Seasonal scent edit', 'Brass wick trimmer (year one)', 'Early access to limited runs'] },
    { id: 'ritual', name: 'The Ritual', price: 1800, badge: null, lede: 'A quarterly delivery designed around your home and rhythm.', items: ['6 \u00d7 220g candles', 'Custom scent consult', 'Free shipping always', 'Members-only edits'] },
  ];

  window.MB = { IMG, products, gallery, tiers };
})();
