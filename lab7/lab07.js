const works = [
    { author: "Micheal Jackson",lifetime:"1022-1055",tips: "Human", photos: ["human1.jpg","human2.jpg","human3.jpg"] },
    { author: "Maria JK",lifetime:"1920-2001", tips: "Classical", photos: ["classical1.jpg","classical2.jpg"] },
    { author: "John Herry UY", lifetime:"1894-1928",tips: "Abstract", photos: ["abstract1.jpg","abstract2.jpg","abstract3.jpg","abstract4.jpg","abstract5.jpg"] },
    { author: "Coco",lifetime:"1777-1799", tips: "Beauty",  photos: ["beauty1.jpg","beauty2.jpg"] }
];



var i=0;
for(;i<works.length;i++) {
    var item1 = document.createElement('div');
    item1.className = "item";


    item1.innerHTML = '<h4> Genre : '+works[i].tips+' </h4>' + '<div class=' + '"' + 'inner-box' + '"' + '>' + '<h3 style="display:inline">' + works[i].author + '</h3>' + '<h5 style="display:inline;margin-left: 1em">lifetime:' + works[i].lifetime + '</h5></div>';

    var photohtml="";
       for(var j=0;j<works[i].photos.length;j++) {
           if(j==0)
           photohtml = photohtml + '<div class=' + '"' + 'inner-box' + '"' + '>' + '<h3>Popular Photos</h3>';
          photohtml = photohtml + '<img class="photo" src="' + works[i].photos[j] + '" />';
       }
    item1.innerHTML = item1.innerHTML+photohtml +'</div>'+ '<button >Visit</button>'+'</div>';
    var bo = document.body; //获取body对象.
//动态插入到body中
     bo.lastChild.appendChild(item1);
     
}


