const API_KEY = "4beccc6dff384b32876ba047859539db";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2002;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const ENDPOINT_TEAM = `${BASE_URL}teams/`;
const ENDPOINT_TOPSCORE = `${BASE_URL}competitions/2002/scorers`;

const fetchAPI = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getAllStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION)
    .then(status)
    .then(json)
    .then(function(data) {
      showStanding(data);
    })
    .catch(error);
}

function showStanding(data) {
    let standings = "";
    let standingElement =  document.getElementById("homeStandings");

    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr>
                    <td><a href="./team.html?id=${standing.team.id}"><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/>${standing.team.name}</a></td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
    });

     standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `;
}

function getTeamById() {
    return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    // const ENDPOINT_TEAM = `${BASE_URL}teams/${idParam}`;
  
    if ("caches" in window) {
      caches.match(ENDPOINT_TEAM + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            // showTeam(data);
            let squad = "";
    let teamElement =  document.getElementById("body-content");
    data.squad.forEach(function (squads) {
        var myDate = new Date(squads.dateOfBirth);
        var output = myDate.getDate() + "\-" +  (myDate.getMonth()+1) + "\-" + myDate.getFullYear();
        squad += `
                <tr>
                    <td>${squads.name}</td>
                    <td>${squads.position}</td>
                    <td>${squads.countryOfBirth}</td>
                    <td>${output}</td>
                    <td>${squads.nationality}</td>
                    <td>${squads.shirtNumber}</td>
                    <td>${squads.role}</td>
                </tr>
        `;
    });

    teamElement.innerHTML = `
             <div class="col s12 m7">
             <h2 class="header">${data.name}</h2>
             <div class="card horizontal">
               <div class="card-image">
                 <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" style="margin:10%;height:100px;width:100px;">
               </div>
               <div class="card-stacked">
                 <div class="card-content">
                   <p>Berdiri Tahun : ${data.founded}</p>
                   <p>Warna Club : ${data.clubColors}</p>
                   <p>Stadion : ${data.venue}</p>
                   <p>Alamat : ${data.address}</p>
                   <p>Nomor Telepon : ${data.phone}</p>
                   <p>Website : ${data.website}</p>
                 </div>
               </div>
             </div>
           </div>
           <div class="col s12 m6">
            <div class="card">
                <div class="card-content">
                <span class="card-title">Daftar Pemain</span>
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Posisi</th>
                            <th>Tempat Lahir</th>
                            <th>Tanggal Lahir</th>
                            <th>Kebangsaan</th>
                            <th>No Punggung</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="daftarPemain">
                        ${squad}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
    `;
            resolve(data);
          });
        }
      });
    }

    fetchAPI(ENDPOINT_TEAM + idParam)
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        // showTeam(data);
        let squad = "";
    let teamElement =  document.getElementById("body-content");
    data.squad.forEach(function (squads) {
        var myDate = new Date(squads.dateOfBirth);
        var output = myDate.getDate() + "\-" +  (myDate.getMonth()+1) + "\-" + myDate.getFullYear();
        squad += `
                <tr>
                    <td>${squads.name}</td>
                    <td>${squads.position}</td>
                    <td>${squads.countryOfBirth}</td>
                    <td>${output}</td>
                    <td>${squads.nationality}</td>
                    <td>${squads.shirtNumber}</td>
                    <td>${squads.role}</td>
                </tr>
        `;
    });

    teamElement.innerHTML = `
             <div class="col s12 m7">
             <h2 class="header">${data.name}</h2>
             <div class="card horizontal">
               <div class="card-image">
                 <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" style="margin:10%;height:100px;width:100px;">
               </div>
               <div class="card-stacked">
                 <div class="card-content">
                   <p>Berdiri Tahun : ${data.founded}</p>
                   <p>Warna Club : ${data.clubColors}</p>
                   <p>Stadion : ${data.venue}</p>
                   <p>Alamat : ${data.address}</p>
                   <p>Nomor Telepon : ${data.phone}</p>
                   <p>Website : ${data.website}</p>
                 </div>
               </div>
             </div>
           </div>
           <div class="col s12 m6">
            <div class="card">
                <div class="card-content">
                <span class="card-title">Daftar Pemain</span>
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Posisi</th>
                            <th>Tempat Lahir</th>
                            <th>Tanggal Lahir</th>
                            <th>Kebangsaan</th>
                            <th>No Punggung</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="daftarPemain">
                        ${squad}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
    `;

        resolve(data);
      });
  });
}

  function getSavedTeam() {
    getAll().then(function(team) {
      console.log(team);
      // Menyusun komponen card artikel secara dinamis
      var teamHTML = "";
      team.forEach(function(team) {
        // var description = team.post_content.substring(0,100);
        teamHTML += `
              
              <div class="card">
              <div class="card-content orange lighten-4">
              <div center-align>
                  <h5 class="center-align">
                   <span class="orange-text text-darken-2">  
                   <a href="./team.html?id=${team.id}">${team.name}</a>
                   </span>
                  </h5>          
              </div>
              </div>
              </div>
            
                  `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #body-content
      document.getElementById("team-fav").innerHTML = teamHTML;
    });
  }

  function getTopscore() {
    if ("caches" in window) {
      caches.match(ENDPOINT_TOPSCORE).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            console.log(data);
            let topskor = "";
            let teamElement =  document.getElementById("topScore");
            data.scorers.forEach(function (topscorers) {
            topskor += `
                <tr>
                    <td>${topscorers.player.name}</td>
                    <td>${topscorers.player.position}</td>
                    <td>${topscorers.team.name}</td>
                    <td>${topscorers.numberOfGoals}</td>
                </tr>
        `;
    });

    teamElement.innerHTML = `
           <div class="col s12 m6">
            <div class="card">
                <div class="card-content">
                <span class="card-title">TOP Score</span>
                ${data.season.startDate} sampai ${data.season.endDate}
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Posisi</th>
                            <th>Team</th>
                            <th>Jumlah Goal</th>
                        </tr>
                    </thead>
                    <tbody id="top">
                        ${topskor}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
    `;
          });
        }
      });
    }

    fetchAPI(ENDPOINT_TOPSCORE)
    .then(status)
    .then(json)
    .then(function(data){
      console.log(data);
      let topskor = "";
            let teamElement =  document.getElementById("topScore");
            data.scorers.forEach(function (topscorers) {
            topskor += `
                <tr>
                    <td>${topscorers.player.name}</td>
                    <td>${topscorers.player.position}</td>
                    <td>${topscorers.team.name}</td>
                    <td>${topscorers.numberOfGoals}</td>
                </tr>
        `;
    });

    teamElement.innerHTML = `

            <div class="card">
                <div class="card-content">
                <span class="card-title">TOP Score</span>
                ${data.season.startDate} sampai ${data.season.endDate}
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Posisi</th>
                            <th>Team</th>
                            <th>Jumlah Goal</th>
                        </tr>
                    </thead>
                    <tbody id="top">
                        ${topskor}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
    `;
    })
  }
