
function loadSettings(callback){
  chrome.storage.local.get(["users","titles","categories"], data=>{
    callback({
      users:(data.users||[]).map(v=>v.toLowerCase()),
      titles:(data.titles||[]).map(v=>v.toLowerCase()),
      categories:(data.categories||[]).map(v=>v.toLowerCase())
    });
  });
}

function filterThreads(settings){

  document.querySelectorAll("li.thread").forEach(thread=>{

    const avatar = thread.querySelector(".avatar img");
    const username = avatar ? avatar.alt.trim().toLowerCase() : "";

    if(settings.users.includes(username)){
      thread.remove();
      return;
    }

    const titleEl = thread.querySelector(".title");
    const title = titleEl ? titleEl.innerText.toLowerCase() : "";

    for(const word of settings.titles){
      if(title.includes(word)){
        thread.remove();
        return;
      }
    }

    const catEl = thread.querySelector("ol li:nth-child(4)");
    const category = catEl ? catEl.innerText.toLowerCase() : "";

    for(const cat of settings.categories){
      if(category.includes(cat)){
        thread.remove();
        return;
      }
    }

  });

}

function filterPosts(settings){

  document.querySelectorAll("div[id^='post']").forEach(post=>{

    const userEl = post.querySelector(".postUser .name a");
    const username = userEl ? userEl.innerText.trim().toLowerCase() : "";

    if(settings.users.includes(username)){
      post.remove();
    }

  });

}

function runFilter(){
  loadSettings(settings=>{
    filterThreads(settings);
    filterPosts(settings);
  });
}

runFilter();

const observer = new MutationObserver(runFilter);

observer.observe(document.body,{
  childList:true,
  subtree:true
});

setInterval(runFilter,2000);
