function updateChoices(alphabet, name) {
  $('#alphabets').val(alphabet.charCodeAt(0) - 65);
  $('#alphabets').trigger('input');
  $('#names').val(fontNames[alphabet].indexOf(name));
  $('#names').trigger('input');
  $('#extra').slideToggle();
}

$(document).ready(function() {
  $('#extra').hide();
  var done = [];
  var pangramIndex = "";
  var currentAlphabet = "";
  var currentName = "";
  currentAlphabet = 'A';
  currentName = fontNames[currentAlphabet][0];
  $('#chosenAlphabet').text(currentAlphabet);
  $('#chosenName').text(currentName);
  $('#alphabets').prop('max', '24');
  $('#names').prop('max', fontNames[currentAlphabet].length - 1);

  $('#displaySearch').on('click', function() {
    $('#extra').slideToggle(function() {
      $('#search').focus();
    });
  });
  $('#alphabets').on('input', function() {
    let currentIndex = Number($('#alphabets').val());
    if(currentIndex >= 23) {
      currentIndex++;
    }
    currentAlphabet = String.fromCharCode(65 + currentIndex);
    $('#chosenAlphabet').text(currentAlphabet);
    $('#names').prop('max', fontNames[currentAlphabet].length - 1);
    $('#names').val(0);
    $('#names').trigger('input');
  });
  $('#names').on('input', function() {
    let currentIndex = Number($('#names').val());
    currentName = fontNames[currentAlphabet][currentIndex];
    $('#chosenName').text(currentName);
    if(!(done.includes(currentName))) {
      let newName = currentName.replace(/ /g, '+');
      $('head').append('<link href="https://fonts.googleapis.com/css?family=' + newName + '&display=swap" rel="stylesheet">');
      done.push(currentName);
    }
    $('#preview').css('font-family', currentName);
    pangramIndex = Math.floor(Math.random() * pangrams.length);
    $('#preview').html(pangrams[pangramIndex]);
  });
  $('#names').trigger('input');

  $('#search').on('input', function() {
    let searchString = $('#search').val();
    let results = [];
    if(searchString != "") {
      searchString = new RegExp(searchString, 'i');
      for(var i in fontNames) {
        for(var j of fontNames[i]) {
          if(searchString.test(j)) {
            results.push({'alphabet': i, 'name': j});
          }
        }
      }
      let resultContent = "";
      for(var i of results) {
        resultContent += `<div class="result" onclick="updateChoices('${i['alphabet']}', '${i['name']}')">${i['name']}</div>`;
      }
      $('#results').html(resultContent);
    }
    else {
      $('#results').html("");
    }
  });
});
