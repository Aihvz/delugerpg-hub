$(document).ready((function(){const t=(new Date).toISOString().split("T")[0],e=document.getElementById("datePicker");function n(e,n){const a=function(t){const e={year:"numeric",month:"long",day:"numeric"},n=new Date(t),a=n.toLocaleDateString("en-US",{month:"long"}),i=a.toUpperCase();return n.toLocaleDateString("en-US",{...e,month:"long",timeZone:"UTC"}).replace(a,i)}(e),i=e===t?`<img src="images/base/menu-profile.webp" width="18" alt="">&nbsp;&nbsp;TODAY'S TRAINER(S) - ${a}`:`<img src="images/base/menu-profile.webp" width="18" alt="">&nbsp;&nbsp;TRAINER(S) FOR ${a}`;$("#txteffect-2 strong").html(i)}function a(){const t=e.value;o(t);n(t),$("#todaytrain-container-2").fadeIn(),$("#todaytrain-container").fadeOut()}function i(){const t=function(t=new Date,e=!1){const n=new Date(t);n.setUTCHours(0,0,0,0),(e||t.getUTCHours()>=0)&&n.setUTCDate(n.getUTCDate()+1);return n}();let n=t-new Date;if(n<0)return e.value=function(){const t=new Date(e.value),n=new Date(t);return n.setUTCDate(n.getUTCDate()+1),n.toISOString().split("T")[0]}(),void a();const i=Math.floor(n/36e5),o=Math.floor(n%36e5/6e4)+1;$("#resetCountdown").text(`Reset Time: ${i} hours ${o} minutes`)}function o(t){const e=new Date(t),n=new Date(e.getUTCFullYear(),0,1),a=Math.floor((e-n)/864e5);let i="G";for(let t=1;t<=a;t++)i=s(i);var o;return $(".lettercode").text(`Letter of the Day: ${i}`),o=i,$.getJSON("data/trainerdata.json",(function(t){o in t?function(t){if(t){const e=$(".todaystrainer-container");e.empty(),t.forEach((t=>{const n=$("<div>").addClass("d-flex flex-column align-items-start border p-1 m-1"),a="Normal"===t.battleMode?"NORMAL BATTLE!":"INVERSE BATTLE!",i="Normal"===t.battleMode?"btn-outline-primary":"btn-outline-dark",o=mainLink+"battle/trainer/"+t.btid+("Normal"===t.battleMode?"":"/inverse"),s=`\n                    \x3c!-- <div class="lettercode"></div> --\x3e\n                    <div class="mb-0 d-flex align-items-center" style="width:100%; margin-left:0px; border-style: none;">\n                        <div class="bg-type">\n                            <img src="${t.image}" class="img-type" alt="Trainer Image">\n                        </div>\n                        <div class="border-right mx-3"></div>\n                        <div class="d-flex flex-column" style="width: 60%;  border-style: none;">\n                            <div><strong>${t.name.toUpperCase()}</strong></div>\n                            <div><small>Type Expert: ${t.expert}</small></div>\n                            <div style="padding-top:4px;">\n                                <a href="${o}" target="_blank" class="btn btn-sm btn-type py-0 px-2 ${i}" id="btn-todaystrainer">${a}</a>\n                            </div>\n                            <div style="padding-top:4px; padding-bottom:4px;">\n                            <a href="#" class="btn btn-sm btn-type py-0 px-2 btn-outline-success btn-view-attack-set" id="Todaystrainermodal" data-bs-trainer-id="${t.id}">VIEW ATTACK SET</a>\n                            </div>\n                        </div>\n                    </div>\n                    <div style="padding-top: 6px;  width: 100%;" class="">\n                        <div class="" style="padding-bottom: 4px;">\n                            <div> REQUIRED POKÉMON TYPE: </div>\n                            ${r=t.pokemonType,r.map((t=>{const e=t.mtype;return Array.isArray(e)?`<span class="type-group">${e.map((t=>`<img src="images/type/${t.toLowerCase()}.webp" width="60" alt="">`)).join("")}</span>`:`<span><img src="images/type/${e.toLowerCase()}.webp" width="60" alt=""></span>`})).join("&nbsp;&nbsp;")}\n                        </div>\n                    </div>\n                `;var r;n.html(s),e.append(n)}))}}(t[o]):console.error(`Trainer data not found for letter: ${o}`)})).fail((function(t,e,n){console.error(`Failed to load trainerdata.json: ${e}, ${n}`)})),i}function s(t){const e=["A","B","C","D","E","F","G","H","I"],n=e.indexOf(t);return e[(n+1)%e.length]}e.value=t,e.addEventListener("change",a),n(t),e.addEventListener("input",(function(n){e.value||(e.value=t,a())})),$(".infoTTR").click((function(){$("#todaytrain-container").fadeIn(),$("#todaytrain-container-2").fadeOut(),$("#txteffect-2 strong").html('<img src="images/base/info.webp" width="18" alt="">&nbsp;&nbsp;TODAY\'S TRAINER INFORMATION')})),i(),setInterval(i,1e3);o(e.value);$(".todaystrainer-container").on("click","#Todaystrainermodal",(async function(t){t.preventDefault();const e=$(this).data("bs-trainer-id"),n=await async function(t){try{const e=await fetch("data/trainerdata.json"),n=await e.json();return Object.values(n).flat().find((e=>e.id===t))||null}catch(t){return console.error("Error fetching trainer data:",t),null}}(e);if(n){const t="Normal"===n.battleMode?"NORMAL BATTLE!":"INVERSE BATTLE!",e="Normal"===n.battleMode?"btn-outline-primary":"btn-outline-dark",i=isMobile()?"Normal"===n.battleMode?`${mainLink}/battle/trainer/${n.btid}`:`${mainLink}/battle/trainer/${n.btid}/inverse`:"Normal"===n.battleMode?`https://www.delugerpg.com/battle/trainer/${n.btid}`:`https://www.delugerpg.com/battle/trainer/${n.btid}/inverse`,o=$('<div class="modal fade" tabindex="-1" role="dialog">').appendTo("body"),s=$('<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">').appendTo(o);$('<div class="modal-content">').appendTo(s).html(`\n            <div class="modal-header-wrapper bg-light">\n            <div class="modal-header" style="background: url('${n.image}') no-repeat right/cover; background-size: 40%;">\n                <div class="modal-title" style="display: flex; align-items: center;">\n                    <div class="left-content" style="width: 70%;">\n                        <label><b>${n.name.toUpperCase()}</b></label>\n                        <label><small>Type Expert: ${n.expert}</small></label><br>\n                        <a href="${i}" target="_blank" class="btn btn-sm btn-type py-1 px-2 ${e}" id="btn-todaystrainer" style="margin-top: 5px;">${t}</a>\n                        <a class="btn btn-sm btn-type py-1 px-2 btn-danger" data-bs-dismiss="modal" style="margin-top: 5px;">CLOSE</a>\n                    </div>\n                </div>\n            </div>\n            </div>\n            <div class="modal-body">\n                ${a=n.pokemonteam,a.map((t=>{const e=isMobile()?`${mainLink}/pokedex/info/${t.pokemon.toLowerCase()}`:`https://www.delugerpg.com/pokedex/info/${t.pokemon.toLowerCase()}`;return`\n            <div class="d-flex flex-column align-items-start p-0 mb-1">\n                <div class="mb-0 d-flex align-items-center" style="width:100%; border-style: none;">\n                    <div class="bg-type">\n                        <img src="${t.pimage}" class="img-ttrainer2">\n                    </div>\n                    <div class="border-right mx-3"></div>\n                    <div class="d-flex flex-column " style="width: 55%;  border-style: none;">\n                        <div>\n                            <sup>#${t.dexnumber} </sup>\n                            <strong>${t.class.toUpperCase()} ${t.pokemon.toUpperCase()}</strong>\n                        </div>\n                        <div style="padding-top:0px;">\n                            <small>\n                                <b>Type:</b>\n                            </small>\n                            ${a=t.type,Array.isArray(a)?a.map((t=>`<img src="images/type/${t.toLowerCase()}.webp" width="48" alt="">`)).join(""):`<img src="images/type/${a.toLowerCase()}.webp" width="48" alt="">`}\n                        </div>\n                        <div style="padding-top:2px; padding-bottom:0px;">\n                            <div class="mb-1">\n                                <small>\n                                    <b>Move(s):</b>\n                                </small>\n                                ${n=t.moves,n.map((t=>`\n        <div>\n            ✧ <span class="txt txt-${t.ptype.toLowerCase()} mb-1" style="font-size: 10px;"> ${t.pmove} </span>\n        </div>\n    `)).join("")}\n                            </div>\n                        </div>\n                        <div style="padding-bottom:4px;">\n                            <a href="${e}" target="_blank" class="btn btn-sm btn-type py-0 px-4 btn-outline-success" id="btn-todaystrainer">VIEW DEX</a>\n                        </div>      \n                    </div>\n                </div>\n            </div>\n            <hr class="my-1">\n        `;var n,a})).join("")}\n            </div>\n        `),o.modal("show"),o.on("hidden.bs.modal",(function(){o.remove()}))}var a}))}));