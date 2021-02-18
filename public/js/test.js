// DrawLine code by greensock
/* Variables */
const orig = document.querySelector('.draw-circle path'),
      monthHtml = document.querySelector('.calendar__month'),
      yearHtml = document.querySelector('.calendar__year');
let length, timer, 
    html = '',
    daysHtml =  document.querySelector('.calendar__days');

const svgCircle = document.querySelector('#circle-1');

//DATES 
let thisDay = new Date(),
    thisMonth = thisDay.getMonth();


var obj = {length:0,
           pathLength:orig.getTotalLength()};

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

/* Functions */
function drawLine(useEl) {
  useEl.style.strokeDasharray = [obj.length,obj.pathLength].join(' ');
}

function createUseEl(svg, el) {
    //create new use element on click
  var useElement =
    document.createElementNS('http://www.w3.org/2000/svg', 'use');

    document.querySelector(svg).appendChild(useElement);
  
    useElement.setAttributeNS(
        'http://www.w3.org/1999/xlink',
        'href', 
         el);
  return useElement
}


// get date + add month, year and days + bigger colored circle around today
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

//Get current season
function getSeason(date) {
  if(thisMonth === 12) {
      thisMonth = 0;
    }
  if(thisMonth === -1) {
      thisMonth = 11;
    }
 
    let month = thisMonth;
    let season = '';
  
  
    switch(month) {
        case 11:
        case 0:
        case 1:
            season = 'winter';
        break;
        case 2:
        case 3:
        case 4:
            season = 'spring';
        break;
        case 5:
        case 6:
        case 7:
            season = 'summer';
        break;
        case 8:
        case 9: 
        case 10:
            season = 'fall';
        break;
    }
    return season;
}


function addDate() {
  html = '';

  let today = new Date(),
        year = today.getFullYear(),
        month = monthNames[thisMonth],
        day = today.getDate(),
        totalDays = daysInMonth(today.getMonth()+1, year);
    monthHtml.innerHTML = `${month}`;
    yearHtml.innerHTML = `${year}`;
  
  // if thisMonth is not this month remove circle
  if(thisMonth !== today.getMonth()+1) {    
    totalDays = daysInMonth(thisMonth+1, year);
  }
 
    
    for(var i = 0; i < totalDays; i++) {
      
       html += `<a href="#">
                              <div class="calendar__day ${day === (i+1) ? 'today' : ''}">
                                  <div class="calendar__day__number">                                     ${i+1}</div>
                              </div>
                            </a>`;
    }
    daysHtml.innerHTML = html; 
    var element =  document.querySelector('.today-svg');
 
   if(thisMonth === today.getMonth() && !element) {
      var useEl = createUseEl('.draw-circle svg' ,'#circle-1');
      var todayHtml = document.querySelector('.today');
      var posX = todayHtml.offsetLeft;
      var posY = todayHtml.offsetTop;
      useEl.classList.add('today-svg');
      useEl.style.transform = `translate(${posX}px, ${posY}px)`;
    } 
  else if (thisMonth === today.getMonth() && element) {
    document.querySelector('.today-svg').classList.remove('hidden');
  }
  else {
     document.querySelector('.today-svg').classList.add('hidden');
  }
     
    
}

function drawOnClick() {
      let useEl = createUseEl('.draw-circle svg' ,'#circle-1');
      useEl.classList.add(`selected-days`);
      useEl.classList.add(monthNames[thisMonth]);

  
        // Reset length to 0 on every click and if second click on this element
        if (obj.length === obj.pathLength) {
          obj.length = 0;
        }

      // Animation on every use element
        TweenMax.to(obj, 0.5, {length:obj.pathLength, onUpdate:drawLine, onUpdateParams:[useEl], ease:Linear.easeNone})

        // Put svg use element on clicked location
        const posX = this.offsetLeft;
        const posY = this.offsetTop;
        useEl.style.transform = `translate(${posX}px, ${posY}px)`;
}

function seasons(next){
      //Remove previous added group elements
    var elems = document.querySelectorAll(".spring");
    elems.forEach(elem =>  elem.parentNode.removeChild(elem));
    var elems = document.querySelectorAll(".summer");
    elems.forEach(elem =>  elem.parentNode.removeChild(elem));
    var elems = document.querySelectorAll(".fall");
    elems.forEach(elem =>  elem.parentNode.removeChild(elem));
    var elems = document.querySelectorAll(".winter");
    elems.forEach(elem =>  elem.parentNode.removeChild(elem));

  let season = getSeason();
  
  if (next === true) {
    thisMonth =  thisMonth + 1;
    season = getSeason(thisMonth);
  }
  else if (next === false) {
    thisMonth =  thisMonth - 1;
    season = getSeason(thisMonth);
  }
  //change snow to seasons element
  let seasonEl, transX, transY;
  //getSeason();

  let amount = 0;
  
  if(season === 'winter') {
    amount = 30;
  }
  else if (season === 'spring') {
    amount = 15;
  }
   else if (season === 'summer') {
    amount = 1;
  }
  else if (season === 'fall') {
    amount = 15;
  }
  
  
  for(var i = 0; i < amount; i++) {
    
    //We need to clone the elements instead of using <use> because we can't animate along path with use
    seasonEl = document.getElementById(season).cloneNode(true);
    document.querySelector("#seasons").appendChild(seasonEl);
    transX = Math.floor(Math.random() * 350) + 1;
    transY = Math.floor(Math.random() * 82) + 1;
    
    seasonEl.classList.add(season);
    
    let winterEl =  seasonEl.querySelector(`#winter-el`);
    let springEl = seasonEl.querySelector('#spring');
    let summerEl = seasonEl;
    let fallEl =  seasonEl.querySelector(`#fall-el`);
    
    //animation on every new season element
    if (season === 'winter') {
      seasonEl.style.transform = `translate(${transX}px, 0px) scale(${Math.random()})`;
      snowAnimation(winterEl);
      document.documentElement.style.setProperty(`--theme`, '#8dcfff');
    }
    else if (season === 'spring') {
      seasonEl.style.transform = `translate(${transX}px, ${transY}px) scale(${Math.random()})`;
      springAnimation(seasonEl);
      document.documentElement.style.setProperty(`--theme`, '#bddc53');
    }
    else if (season === 'summer') {
      seasonEl.style.transform = `translate(270px,0) scale(${Math.random()+0.9})`;
      document.documentElement.style.setProperty(`--theme`, '#deab05');
      document.documentElement.style.setProperty(`--col`, '#222222');
      sunAnimation(summerEl);
    }
    else if (season === 'fall') {
      seasonEl.style.transform = `translate(${transX}px, 0px) scale(${Math.random()})`;
      document.documentElement.style.setProperty(`--theme`, '#ea994a');
      fallAnimation(fallEl);
    }
     
  }
}
 
function snowAnimation(el) {
  //make svg follow path 
  let siblingPath = el.nextElementSibling;
  let delayAnimation = Math.random();
   
 TweenMax.to(el, 1, { 
   bezier: {
    values: MorphSVGPlugin.pathDataToBezier(siblingPath), 
    type: "cubic"
  },
  repeat: -1,
  delay: delayAnimation,
  ease: Ease.easeOut
},  delayAnimation*10); 
}

function springAnimation(el) {
  //random flower petal colors
  let colors = ['#FF9900', '#FF6600', '#FF3300', '#F56991'];
  let petals = el.querySelectorAll('.petal'); 
  petals.forEach(petal => petal.style.fill = colors[Math.floor(Math.random() * 3) + 0]);
  
  //Scale flowerpath en move .flower 
  const path = document.querySelector('#flowerPath');

  TweenMax.to('#flowerPath', 2, { 
    scaleY:1.8, 
    transformOrigin:"50% 50%", 
    delay: 0.1,
    ease: Ease.easeOut
  },  1.5);
  TweenMax.to('.flower', 1, { 
    y:-12, 
    transformOrigin:"50% 50%", 
    delay: 0.1,
    ease: Ease.easeOut
  },  1.5);

}

function sunAnimation(el) {

  let shines = el.querySelectorAll('.shine');  
  shines.forEach((shine, i) => {
    TweenMax.to(shine, 0.8, { 
      morphSVG:'M3,8 C7.27916667,12.0320312 17.0177083,20.9453125 21.296875,24.9773437 L3,8 Z',
      repeat: -1,
      delay: i*0.1,
      ease: Ease.easeOut,
      yoyo:true
    });
  });
  let sun = el.querySelector('#Oval');
  
  TweenMax.to(sun, 2.5, { 
    scale:1.1, 
    transformOrigin:"50% 50%", 
    ease: Ease.easeOut,
    repeat:-1,
    yoyo:true
  });
}

function fallAnimation(el) {
  //make svg follow path 
  let siblingPath = el.nextElementSibling;
  let delayAnimation = Math.random();

  TweenMax.to(el, 3, { 
     bezier: {
      values: MorphSVGPlugin.pathDataToBezier(siblingPath), 
      type: "cubic"
    },
    repeat: -1,
    delay: delayAnimation,
    ease: Ease.ease
  });
}

// Fist add dates
addDate();

function addRemoveSelected() {
    let selected = document.querySelectorAll('.selected-days');
    let today = new Date();
    selected.forEach( function(useEl) {
      if( useEl.classList.contains( `${monthNames[thisMonth]}` ) ) {
         useEl.classList.remove('hidden');
      }
      else {
        useEl.classList.add('hidden');
      }
    });
      
    days = document.querySelectorAll('a');
    days.forEach(day => day.addEventListener('click', drawOnClick));
}

//get all days
var days = document.querySelectorAll('a');
const nextMonth = document.querySelector('.next');
const prevMonth = document.querySelector('.prev');
let next;
/* Event listeners */
days.forEach(day => day.addEventListener('click', drawOnClick));
 
nextMonth.addEventListener('click', function() {
  //month + 1
  next =  true;
  seasons(next);
  addDate();
  addRemoveSelected();
 
});
prevMonth.addEventListener('click', function() {
  
  //month -1
  next =  false;
 
  seasons(next);
  addDate();
  addRemoveSelected();
});



// Add seasons header
seasons(next);

//remember month of clicked element, remove hidden from element if this month is the same as that month