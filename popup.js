
function parseList(text){
  return text.split(',').map(v=>v.trim()).filter(v=>v.length>0);
}

document.addEventListener("DOMContentLoaded",()=>{

chrome.storage.local.get(["users","titles","categories"],data=>{
  document.getElementById("users").value=(data.users||[]).join(",");
  document.getElementById("titles").value=(data.titles||[]).join(",");
  document.getElementById("categories").value=(data.categories||[]).join(",");
});

document.getElementById("save").onclick=()=>{

  const users=parseList(document.getElementById("users").value);
  const titles=parseList(document.getElementById("titles").value);
  const categories=parseList(document.getElementById("categories").value);

  chrome.storage.local.set({
    users:users,
    titles:titles,
    categories:categories
  },()=>{
    document.getElementById("status").innerText="Kaydedildi";
    setTimeout(()=>{
      document.getElementById("status").innerText="";
    },1500);
  });

};

});
