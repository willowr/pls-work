const rp = require('request-promise');

const rebuildSite = async function() {
    var options = {
        method: 'POST',
        uri: 'https://api.netlify.com/build_hooks/5f1763a35ec623022373884d',
        body: {},
        json: true
      };

      console.log('Rebuilding the site ... ');

      const returned = await rp(options).then(function(res) {
        console.log('Successfully hit webhook', res);
      }).catch(function(err) {
        console.log('Error:', err);
      });

      return returned
}

export { rebuildSite }
