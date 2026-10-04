(() => {
const root=document.documentElement;
const q=(s,scope=document)=>scope.querySelector(s);
const qa=(s,scope=document)=>[...scope.querySelectorAll(s)];
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function theme(){
  const saved=localStorage.getItem("forgekit-theme");
  root.dataset.theme=saved||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
  qa("[data-theme-toggle]").forEach(btn=>btn.addEventListener("click",()=>{
    const next=root.dataset.theme==="dark"?"light":"dark";
    root.dataset.theme=next;localStorage.setItem("forgekit-theme",next);
  }));
}
function nav(){
  const toggle=q("[data-nav-toggle]"),nav=q("#site-nav");if(!toggle||!nav)return;
  toggle.addEventListener("click",()=>{const open=nav.classList.toggle("is-open");toggle.setAttribute("aria-expanded",String(open));});
  qa("a",nav).forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");}));
}
function year(){qa("[data-year]").forEach(n=>n.textContent=new Date().getFullYear());}
function reveals(){
  const items=qa("[data-reveal]");
  if(reduced){items.forEach(n=>n.classList.add("is-visible"));return;}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(!e.isIntersecting)return;
    setTimeout(()=>e.target.classList.add("is-visible"),Number(e.target.dataset.delay||0));
    io.unobserve(e.target);
  }),{threshold:.12});
  items.forEach(n=>io.observe(n));
}
function counters(){
  const items=qa("[data-count]");if(!items.length)return;
  const animate=n=>{
    const target=Number(n.dataset.count||0);
    if(reduced){n.textContent=target.toLocaleString();return;}
    const start=performance.now(),duration=1100;
    const tick=now=>{const p=Math.min((now-start)/duration,1),e=1-Math.pow(1-p,3);n.textContent=Math.round(target*e).toLocaleString();if(p<1)requestAnimationFrame(tick);};
    requestAnimationFrame(tick);
  };
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting&&!e.target.dataset.counted){e.target.dataset.counted="1";animate(e.target);}}),{threshold:.5});
  items.forEach(n=>io.observe(n));
}
function tabs(){
  qa("[data-tabs]").forEach(box=>{
    const buttons=qa("[data-tab]",box),panels=qa("[data-panel]",box);
    buttons.forEach(btn=>btn.addEventListener("click",()=>{
      const name=btn.dataset.tab;buttons.forEach(b=>b.classList.toggle("is-active",b===btn));panels.forEach(p=>p.classList.toggle("is-active",p.dataset.panel===name));
    }));
  });
}
function copy(){
  qa("[data-copy]").forEach(btn=>btn.addEventListener("click",async()=>{
    try{await navigator.clipboard.writeText(btn.dataset.copy||"");}catch{return;}
    const label=q("span",btn);if(label){const old=label.textContent;label.textContent="Copied";setTimeout(()=>label.textContent=old,1200);}
    btn.classList.add("is-copied");setTimeout(()=>btn.classList.remove("is-copied"),1200);
  }));
}
function pricing(){
  const box=q("[data-billing]");if(!box)return;
  const buttons=qa("[data-bill]",box),values=qa("[data-price-monthly]");
  buttons.forEach(btn=>btn.addEventListener("click",()=>{
    const yearly=btn.dataset.bill==="yearly";
    buttons.forEach(b=>b.classList.toggle("is-active",b===btn));
    values.forEach(v=>{v.textContent=yearly?(v.dataset.priceYearly||v.dataset.priceMonthly):v.dataset.priceMonthly;});
    qa("[data-period]").forEach(p=>p.textContent=yearly?"/ month, billed yearly":"/ month");
  }));
}
function demo(){
  const run=q("[data-run-demo]"),input=q("#project-input");if(!run||!input)return;
  const count=q("[data-char-count]"),log=q("[data-process-log]"),spinner=q("[data-spinner]"),label=q("[data-run-label]");
  const score=q("[data-result-score]"),ring=q("[data-score-ring]"),status=q("[data-result-status]"),title=q("[data-result-title]"),copyNode=q("[data-result-copy]");
  const clarity=q("[data-result-clarity]"),brand=q("[data-result-brand]"),launch=q("[data-result-launch]");
  qa("[data-fill]").forEach(btn=>btn.addEventListener("click",()=>{input.value=btn.dataset.fill||"";input.dispatchEvent(new Event("input"));input.focus();}));
  input.addEventListener("input",()=>{if(count)count.textContent=input.value.length+"/60";});
  const write=items=>{if(log)log.innerHTML=items.map(x=>"<span>"+x+"</span>").join("");};
  run.addEventListener("click",()=>{
    const value=input.value.trim();
    if(!value){input.classList.add("is-invalid");write(["Enter a project name to begin."]);return;}
    input.classList.remove("is-invalid");run.disabled=true;if(spinner)spinner.hidden=false;if(label)label.textContent="Processing";status.textContent="Running";status.classList.add("is-running");
    write(["Parsing project name…"]);
    setTimeout(()=>write(["Parsing project name…","Calculating clarity…"]),320);
    setTimeout(()=>write(["Parsing project name…","Calculating clarity…","Generating launch score…"]),680);
    setTimeout(()=>{
      const lengthBoost=Math.min(value.length*2,16),vowels=(value.match(/[aeiou]/gi)||[]).length;
      const c=Math.min(98,68+lengthBoost+vowels),b=Math.min(99,72+vowels*4+(value.includes(" ")?8:0)),s=Math.round((c+b+91)/3);
      score.textContent=s;clarity.textContent=c;brand.textContent=b;launch.textContent=91;
      ring.style.setProperty("--score",(s*3.6)+"deg");
      status.textContent="Complete";status.classList.remove("is-running");
      title.textContent=value+" is ready for a stronger first pass.";
      copyNode.textContent="The browser processed your input locally and returned a structured result.";
      write(["✓ "+value,"✓ "+s+"/100 launch score","✓ No upload required"]);
      run.disabled=false;if(spinner)spinner.hidden=true;if(label)label.textContent="Run again";
    },1150);
  });
}
function contact(){
  const form=q("[data-contact-form]");if(!form)return;
  const status=q("[data-form-status]");
  form.addEventListener("submit",e=>{
    e.preventDefault();let valid=true;
    qa("input, textarea",form).forEach(field=>{
      const err=q(".field-error",field.parentElement);let msg="";
      if(field.required&&!field.value.trim())msg="This field is required.";
      else if(field.type==="email"&&field.value&&!/^\S+@\S+\.\S+$/.test(field.value))msg="Enter a valid email.";
      else if(field.minLength>0&&field.value.trim().length<field.minLength)msg="Use at least "+field.minLength+" characters.";
      if(err)err.textContent=msg;field.classList.toggle("is-invalid",!!msg);if(msg)valid=false;
    });
    if(!valid){status.className="form-status is-error";status.textContent="Please correct the highlighted fields.";return;}
    status.className="form-status is-loading";status.textContent="Processing request…";
    setTimeout(()=>{status.className="form-status is-success";status.textContent="Success — connect this handler to your backend or form provider for production delivery.";form.reset();},800);
  });
}
theme();nav();year();reveals();counters();tabs();copy();pricing();demo();contact();
})();