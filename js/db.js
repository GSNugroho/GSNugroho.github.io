var dbPromised = idb.open("pocket-football", 1, function(upgradeDb) {
    var teamObjectStore = upgradeDb.createObjectStore("team", {
      keyPath: "id"
    });
     teamObjectStore.createIndex("shortName", "shortName", { unique: false });
  });
  
  function saveForLater(team) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("team", "readwrite");
        var store = tx.objectStore("team");
        console.log(team);
        store.put(team);
        return tx.complete;
      })
      .then(function() {
        console.log("Team Favorite Berhasil Di Simpan.");
        M.toast({
          html: 'Team berhasil disimpan!'
      });
      });
  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("team", "readonly");
          var store = tx.objectStore("team");
          return store.getAll();
        })
        .then(function(team) {
          resolve(team);
        });
    });
  }

  function getDataById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction('team', "readonly");
                var store = tx.objectStore('team');
                return store.get(id);
            })
            .then(function (data) {
              console.dir('Lppp:'+data);
                resolve(data);
            });
    });
}

  function deleteTeam(id){
    dbPromised
    .then(function(db) {
      var tx = db.transaction('team', 'readwrite');
      var store = tx.objectStore('team');
      store.delete(id);
      return tx.complete;
    }).then(function() {
      console.log('Team Favorite Berhasil Di Hapus.');
      M.toast({
        html: 'Team berhasil dihapus!'
    });
    });
  }

  function cek(id){
    return new Promise(function (resolve, reject) {
      dbPromised
          .then(function (db) {
              var tx = db.transaction('team', "readonly");
              var store = tx.objectStore('team');
              return store.get(id);
          })
          .then(function (data) {
              if (data != undefined) {
                  resolve("data favorit")
              } else {
                  reject("bukan data favorit")
              }
          });
  });
  }

  function getSavedTeamById(id){
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = id;

    let squad = "";
    let teamElement =  document.getElementById("body-content");
    getDataById(idParam).then(function(data) {
      console.log(idParam);
      console.dir("getSavedTimById: " + data);
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

    // document.getElementById("squad").innerHTML = tabelSquadHTML;
    })
  }

  