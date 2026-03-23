const n=(r,t="USD")=>new Intl.NumberFormat("en-US",{style:"currency",currency:t,minimumFractionDigits:2}).format(r);export{n as f};
