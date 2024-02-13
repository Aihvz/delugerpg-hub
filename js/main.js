  // Menu data
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  const mainLink = isMobile() ? 'https://m.delugerpg.com/' : 'https://www.delugerpg.com/';

const menuItems = [
  { text: 'Home', icon: 'images/base/menu-home.webp', link: `/` },
  { text: 'Game', icon: 'images/base/menu-team.webp', link: `${mainLink}`, target: '_blank' },
  { text: 'Tools', icon: 'images/base/menu-setting.webp', link: `#`, id: 'ToolsModal' },
  { text: 'Gyms', icon: 'images/base/gyms.webp', link: `${mainLink}gyms`, target: '_blank' },
  { text: 'Trainers', icon: 'images/base/menu-profile.webp', link: `${mainLink}trainers`, target: '_blank' },
  { text: 'PokéDex', icon: 'images/base/menu-pokedex.webp', link: `${mainLink}pokedex`, target: '_blank' },
  { text: 'Guide', icon: 'images/base/guide.webp', link: `guide` },
  { text: 'About', icon: 'images/base/info.webp', link: `about` },
];


// Function to create a menu item element
function createMenuItem(item) {
  const targetAttr = item.target ? `target="${item.target}" rel="noopener noreferrer"` : '';
  return `<a class="btn btn-secondary text-black-50 py-1 px-3 trainer-menu" href="${item.link}" ${item.id ? `id="${item.id}"` : ''} ${targetAttr}><img src="${item.icon}" width="24" alt=""><small>${item.text}</small></a>`;
}


$(document).ready(function() {

//######## Menus ########//
const mainMenu = $('.main-menu');
const buttonGroup = $('<div class="btn-group btn-group-sm" role="group" aria-label="Trainer Menu">');

menuItems.forEach(item => {
  buttonGroup.append(createMenuItem(item));
});

mainMenu.append(buttonGroup);

mainMenu.on('click', '#ToolsModal', function(event) {
  event.preventDefault();
});
//######## Menus ########//


//######## Menus Area ########//
const menuArea = [
    { link: `${mainLink}profile`, image: 'images/game/myprofile.png', text: 'My Profile' },
    { link: `${mainLink}pokemon`, image: 'images/game/mypokemon.png', text: 'My Pokemon' },
    { link: `${mainLink}team`, image: 'images/game/myteam.png', text: 'My Team' },
    { link: `${mainLink}logs`, image: 'images/game/activity.png', text: 'Account Activity' },
    { link: `${mainLink}pokemart`, image: 'images/game/pokemart.png', text: 'PokeMart' },
    { link: `${mainLink}trade/lookup`, image: 'images/game/searchoffer.png', text: 'Search and Offer' },
    { link: `${mainLink}leaderboards`, image: 'images/game/leaderboard.png', text: 'Leaderboards' },
    { link: `${mainLink}event`, image: 'images/game/events.png', text: 'Events' },
    { link: `${mainLink}publogs`, image: 'images/game/logs.png', text: 'Public Logs' },
    { link: `${mainLink}hiddenfeatures`, image: 'images/game/hiddenfeat.png', text: 'Hidden Features' },
    { link: 'https://discord.com/invite/usyv8a5UVT', image: 'images/game/discord.png', text: 'Discord Chat' },
    { link: 'https://www.delugerpg.net/', image: 'images/game/forum.png', text: 'Forum' }
];

// Function to create a menu item element
function createDynamicMenuItem(item) {
    return `
        <div class="d-inline-block border border-secondary mb-1 bg-default">
            <a href="${item.link}" target="_blank">
                <div style="background: url('${item.image}') no-repeat center/cover; height: 80px; width: 110px; overflow: hidden"></div>
                <div class="p-1 px-2 small">${item.text}</div>
            </a>
        </div>`;
}

// Generate menu item HTML
const dynamicMenuItemsHTML = menuArea.map(item => createDynamicMenuItem(item)).join('');
$('.menu-area').append(dynamicMenuItemsHTML);

//######## Menus Area ########//




//######## Modal ########//

// Load All same Trainer EXP ID (Alternate List)
$(document).on('click', '#toptionid', function () {
  var texp = $(this).closest('tr').find('.exp').data('num');
  var opp = $(this).closest('tr').find('.name').text().split('(')[0].trim();

  // Clear existing content in 'trainertable' rows container
  $('#trainertable-rows').empty();

  // Create a new table row element with the retrieved data
  var filteredData = pdata.filter(function (batt) {
      return batt['exp' + eset] === texp && batt.opp.trim().toLowerCase() !== opp.toLowerCase();
  });

  var expCaption = $('#exp-caption'); // Get the exp-caption element

  if (filteredData.length === 0) {
      // Display message when no data is present
      createAlert('info', 'No Trainers with the same experience on the list');
      return; // Don't proceed further if no data is present
  }

  $('.alert').hide();
  // Append the new table row to the 'trainertable-rows'
  filteredData.forEach(function (batt) {
      var html = '<tr class="btitem bg-' + toLower(batt.head) + '">' +
          '<td class="opp" style="text-align:left; font-size:12px; text-transform: uppercase;">' + batt.opp + '</td>' +
          '<td class="head" style="text-align:left; font-size:12px; text-transform: uppercase;">' + batt.head.replace(/-/g, ' ') + '</td>' +
          '<td class="button" style="text-align:center">' + getButtonsHtml(batt.base, batt.btid, batt.opp) + '</td>' +
          '</tr>';
      $('#trainertable-rows').append(html);
  });

  // Update content of exp-caption when there are trainers with the same experience
  expCaption.text("with " + numberWithCommas(texp) + " experience");

  $('#toption').modal('show');
});

var toptionModal = $('<div class="modal fade" id="toption" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">' +
    '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">' +
    '<div class="modal-content">' +
    '<div class="modal-header-wrapper bg-light">' +
    '<div class="modal-header" style="background: url(\'https://i.dstatic.com/images/trainers/professorsada.webp\') no-repeat right/cover; background-size: 40%;">' +
    '<div class="modal-title" style="display: flex; align-items: center;">' +
    '<div class="left-content" style="width: 70%;">' +
    '<label><b>ALTERNATIVE TRAINERS LIST</b></label>' +
    '<label id="exp-caption"><small></small></label><br>' +
    '<a class="btn btn-sm btn-type py-1 px-2 btn-danger" data-bs-dismiss="modal" style="margin-top: 5px;">CLOSE</a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="modal-body">' +
    '<table id="trainertable" class="table table-hover" style="overflow-x: auto; white-space: nowrap;">' +
    '<tbody id="trainertable-rows"></tbody>' +
    '</table>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>');

$('body').append(toptionModal);
// Load All same Trainer EXP ID (Alternate List)


// SHow modal S-Trainers
$('#openTrainModal').on('click', function (event) {
    event.preventDefault();
    $('#train').modal('show');
  });

  
// Training Accounts (S-Types)
var trainModal = $('<div class="modal fade" id="train" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">' +
    '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">' +
    '<div class="modal-content">' +
    '<div class="modal-header-wrapper bg-light">' +
    '<div class="modal-header" style="background: url(\'https://i.dstatic.com/images/trainers/teacher.webp\') no-repeat right/cover; background-size: 40%;">' +
    '<div class="modal-title" style="display: flex; align-items: center;">' +
    '<div class="left-content" style="width: 80%;">' +
    '<label><b>TRAINING ACCOUNTS (S-TYPE)</b></label>' +
    '<label>By Yuichi (sugus2)</label><br>' +
    '<label style="font-size:9px;">Note: Also for leveling up low-level Pokémon to reach level 100.</label>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="modal-body">' +
    '<a style="text-decoration:none">' +
    '<b>Choose S-Type</b>' +
    '</a>' +
    '<br>' +
    '<div class="form-group">' +
    '<div style="padding-top:2px;">' +
    '<select name="s-trainer" class="form-control" style="width:100%; height:2.2em;" id="s-trainer">' +
    '<option value="s-bug">S-Bug</option>' +
    '<option value="s-dark">S-Dark</option>' +
    '<option value="s-dragon">S-Dragon</option>' +
    '<option value="s-electric">S-Electric</option>' +
    '<option value="s-fairy">S-Fairy</option>' +
    '<option value="s-fighting">S-Fighting</option>' +
    '<option value="s-fire">S-Fire</option>' +
    '<option value="s-flying">S-Flying</option>' +
    '<option value="s-ghost">S-Ghost</option>' +
    '<option value="s-grass">S-Grass</option>' +
    '<option value="s-ground">S-Ground</option>' +
    '<option value="s-ice">S-Ice</option>' +
    '<option value="s-normal">S-Normal</option>' +
    '<option value="s-poison">S-Poison</option>' +
    '<option value="s-psychic">S-Psychic</option>' +
    '<option value="s-rock">S-Rock</option>' +
    '<option value="s-steel">S-Steel</option>' +
    '<option value="s-water">S-Water</option>' +
    '</select>' +
    '</div>' +
    '<div class="btn-group" role="group" style="padding-top:20px; float:left;">' +
    '<button class="battnormal btn btn-sm btn-outline-primary" id="battnormal" data-toggle="popover">NORMAL</button>' +
    '<button class="battinverse btn btn-sm btn-outline-dark" id="battinverse" data-toggle="popover">INVERSE</button>' +
    '<button class="btn btn-sm btn-type py-1 px-2 btn-danger" data-bs-dismiss="modal">CLOSE</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>');

// Append the modal to the body
$('body').append(trainModal);


// Training Accounts (Normal/Inverse)
$("#battnormal, #battinverse").click(function() {
	var selectedTrainer = $("#s-trainer").val();
	var isInverse = $(this).attr("id") === "battinverse";
	var battleLink = isInverse ? mainLink + `battle/computer/u/${selectedTrainer}/inverse` : mainLink + `battle/computer/u/${selectedTrainer}`;
	window.open(battleLink, '_blank');
});
// Training Accounts (S-Types)





// Tools Modal
$('#ToolsModal').on('click', function (event) {
  event.preventDefault();
  ToolsModal();
});

function createToolItem(imageUrl, name, link, hasBadge = false) {
    let badgeHTML = '';
    let targetAttribute = '';

    if (hasBadge) {
        badgeHTML = `
            <span class="position-absolute top-0 start-0 translate-middle badge rounded-circle bg-primary" style="transform: translateX(-50%); margin-top: 2px; margin-left: 5px;">
                <i class="fas fa-check"></i>
                <span class="visually-hidden">badge</span>
            </span>
        `;
        targetAttribute = 'target="_blank"';
    }

    return `
        <div class="d-inline-block border border-secondary mb-1 bg-default position-relative">
            <a href="${link}" ${targetAttribute}>
                <div style="background: url('${imageUrl}') no-repeat center/cover; height: 80px; width: 117px; overflow: hidden"></div>
                <div class="p-1 px-2 small">${name}${badgeHTML}</div>
            </a>
        </div>
    `;
}



function ToolsModal() {
  // Define the tool items
  const toolItems = [
    { imageUrl: 'images/game/expcalc.png', name: 'EXP Calculator', link: 'expcalculator' },
    { imageUrl: 'images/game/typecheck.png', name: 'Type Checker', link: 'typechecker' },
    { imageUrl: 'images/game/todaytrainer.png', name: "Today's Trainer", link: 'todaystrainer' },
    { imageUrl: 'images/game/typeeffect.png', name: 'Type Effectiveness', link: 'typeeffect' },
    { imageUrl: 'images/game/taxcalc.png', name: 'Tax Calculator', link: `${mainLink}taxcalc`, hasBadge: true },
    { imageUrl: 'images/game/attackdex.png', name: 'Attack Dex', link: `${mainLink}attackdex`, hasBadge: true },

];

  // Generate tool item HTML
  const toolItemsHTML = toolItems.map(item => createToolItem(item.imageUrl, item.name, item.link, item.hasBadge)).join('');

  // Generate modal content
  const modalContent = `
      <div class="modal fade tools-modal" id="toolsModal" tabindex="-1" aria-labelledby="toolsModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
              <div class="modal-content">
                  <div class="modal-header bg-ice">
                      <h5 class="modal-title" id="toolsModalLabel">
                          <img src="images/base/menu-setting.webp" width="24" alt=""> Pokémon DelugeRPG Tools
                      </h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">

                  
                  <div class="alert alert-info alert-white rounded mt-0 mb-2 border border-info p-1" role="alert" id="checkboxInfo" style="">
                  <div class="icon" ><i class="fa fa-info-circle"></i></div>
                  <div class="text d-flex align-items-center"><b>The blue check in the top left corner indicates that it's the official game tool, or it will be redirected to the game site.</b></div>  
                  </div>

                      <!-- Add your tool items here -->
                      <div class="card-block d-flex-nowrap bg-white border-secondary text-center p-1">
                          ${toolItemsHTML}
                      </div>
                  </div>
              </div>
          </div>
      </div>`;

  // Appending the modal to the body
  $('body').append(modalContent);

  // Show the modal
  $('#toolsModal').modal('show');
}
// Tools Modal

//######## Modal ########//




//######## HomePage ########//
// Function to format the date and time with full month name
function formatDateTime() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDate = new Date();
    
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    
    let hours = currentDate.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (12:00 AM)
    
    const minutes = currentDate.getMinutes();
    
    // Add a space inside the HTML entity
    const formattedDateTime = `<i class="fa-regular fa-calendar"></i>&#8201; ${month} ${day}, ${year} - ${hours}:${String(minutes).padStart(2, '0')} ${ampm}`;
    
    return formattedDateTime;
}

// Function to update the content of the div with the formatted date and time
function updateDateTime() {
    document.querySelector('.datetime').innerHTML = formatDateTime();
}

updateDateTime();
setInterval(updateDateTime, 1000);


//######## InfoMessage ########//
// Array of pages
const pages = [
    "<b>Hello DelugeRPG Users, I'm your Cutie Professor Aihvz, serving as your guide.</b><br><b>DelugeRPG Hub</b> is an information tool site for the DelugeRPG Game. This is unofficial and not affiliated with the game.<br><br>Upon visiting this site, no personal or private information is collected from you, such as your name, address, or password.",
    "<b>TOP MENUS</b><br>The website features 8 main menus: <b>HomePage, Tools, Guide</b> and <b>About</b> which are directly accessible on the site. Other menus like <b>Games, Gyms, Trainers</b> and <b>Pokedex</b> will redirect users to the DelugeRPG Game.<br><br>Within the Tools section, you can find the <b>EXP Calculator, Type Checker, Today's Trainer</b> and <b>Type Effectiveness</b> under /tools (unofficial) on this site. The <b>Tax Calculator</b> and <b>Attack Dex</b> serve as official game tools or will redirect users to the game site.</div>",
    "<b>TOOLS: EXP CALCULATOR</b><br><b>EXP Calculator is unofficial/fan-made calculator</b> for DelugeRPG - A fork of Psyduck's Exp Calculator. This tool is designed for non-event Pokémon (ATM) and calculates within the specified range (Current EXP to Target EXP) of 100,000 to 10 Million | 10 Million to 50 Million | 50 Million to 100 Million | 100 Million to 150 Million.<br><br>There's an <b>Official EXP Calculator</b> in the game which available every Wednesday and with full access to those supporting the game on <a href='https://www.patreon.com/delugerpg' target='_blank' class='text-primary'><b>Patreon</b></a>.",
    "<b>TOOLS: TYPE CHECKER</b><br><b>Type Checker</b> is a tool that generates trainers you can battle to gain experience and coins based on your Pokémon's type. This tool also displays Attack Moves and Notes, providing information about the opponent trainers.<br><br>All Information is based on <a href='https://www.delugerpg.net/viewtopic.php?t=18817' target='_blank' class='text-primary'><b>Heodenings_Waltz's Guide: Grinding Exp and Coins using VIP Elite Four Trainers</b></a>.",
    "<b>TOOLS: TODAY'S TRAINER</b><br><b>Today's Trainer</b> is a tool that generates the region champions and ultimate trainers for you to battle, earning experience and coins based on the date. This tool provides more experience and coins compared to the Type Checker. Note: The ultimate trainers will have their Pokémon's stats and classes randomized during trainer battles.<br><br>All Information is based on <a href='https://www.delugerpg.net/viewtopic.php?t=27227' target='_blank' class='text-primary'><b>Heodenings_Waltz's Guide: Grinding Exp and Coins using Region Champions and Ultimate Trainers</b></a>.",
    "<b>TOOLS: TYPE EFFECTIVENESS</b><br><b>Type Effectiveness</b> is a tool that displays the effectiveness (damage, weakness, resistance, and immunity) based on the selected Pokémon type(s). It have two modes - <b>Normal Effectiveness</b> is the regular type style while <b>Inverse Effectiveness</b> inverts the regular type chart, turning immunities and resistances into weaknesses, and weaknesses into resistances.<br><br>This tool is based on <b>Pokémon Deluge's Normal Type Chart and Inverse Type Chart</b>.",
    "<b>TOP MENUS: GUIDE AND ABOUT</b><br>The <b>Guide Links Page</b> consists of all helpful links that redirect to the game and other unofficial tools.<br><br>The <b>About Page</b> provides information about this site. It also includes the changelogs that outline the changes, updates, and new features introduced over time, helping users stay in the loop about the site's improvements.<br>",
    "<b>DELUGERPG HUB AREA</b><br><b>The DelugeRPG Hub Area</b>, featured on the HomePage consists of a list of links that will redirect users to the game site. This navigational hub is designed for user convenience and efficient access to various sections within the DelugeRPG Game.<br>The <b>Discord Chat</b> and <b>Forum</b> links are provided to assist users with bugs/errors, seeking answers to questions, sharing suggestions, and engaging in meaningful communication within the community.<br><br>Note: No personal or private information is collected from you, such as your name, address, or password. The links redirect to the game site; you can verify this by checking the browser's address bar.",
    "<b>CONTACT INFORMATION:</b><br>If you have any concerns, questions, suggestions or need assistance regarding the site, feel free to reach out to us.<br><br><b>DISCORD</b><br>✧ <b>MyHero#3563</b><br>✧ <b>heodenigs_waltz#3940</b><br><b>IN-GAME USER</b><br>✧ <b>MyHero</b><br>✧ <b>Aihvz</b><br><br><b>That's for All DelugeRPG Users. Enjoy this information tool site and also the DelugeRPG Game. Thank You 😊</b>"
];

// Variable to keep track of the current page
let currentPage = 0;

// Function to show the previous page
function showPreviousPage() {
    if (currentPage > 0) {
        currentPage--;
        updateInfoChat();
    }
    updateButtonState();
}

// Function to show the next page
function showNextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        updateInfoChat();
    }
    updateButtonState();
}

// Function to update the content of the infochat div
function updateInfoChat() {
    document.querySelector('.infochat .infomessage').innerHTML = pages[currentPage];
}

// Function to update the state of previous and next buttons
function updateButtonState() {
    const previousBtn = document.querySelector('.info-buttons .previous-btn');
    const nextBtn = document.querySelector('.info-buttons .next-btn');

    // Hide previous button on the first page
    if (currentPage === 0) {
        previousBtn.style.display = 'none';
    } else {
        previousBtn.style.display = 'inline-block';
    }

    // Hide next button on the last page
    if (currentPage === pages.length - 1) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'inline-block';
    }
}

// Initialize the content with the first page
document.addEventListener("DOMContentLoaded", () => {
    updateInfoChat();
    updateButtonState();
});

// Event listeners for previous and next buttons
document.querySelector('.info-buttons .previous-btn').addEventListener('click', showPreviousPage);
document.querySelector('.info-buttons .next-btn').addEventListener('click', showNextPage);

// Load the first page content when the script runs
updateInfoChat();
updateButtonState();

//######## InfoMessage ########//
//######## HomePage ########//


});