(function() {
  'use strict';

  // Accepts an element contains the words to create a would cloud from
  function wordCloud(element) {
    // Create an array of all text in the supplied element, filtered by words only
    var elementWords = element.innerText.toLowerCase().match(/([\w]+)/g);
    var blacklist = ['if', 'a', 'of', 'the', 'and', 'or', 'until', 'since', 'while', 'in', 'out', 'with', 'to', 'has', 'are', 'for', 'from', 'that', 'this', 'as', 'an', 'at', 'be', 'will', 'we', 'you', 'our', 'is', 'through', 'those', 'who', 'but', 'into', 'within', 'them'];
    var words = [];
    var wordCloudContainer = document.querySelector('.word-cloud');

    // Calculate maxFontSize by finding the computed font size of body (removing 'px'
    // from the string and converting to number) and multipling by 5.
    var maxFontSize = +(window.getComputedStyle(document.body)['font-size'].match(/([0-9]+)/)[0]) * 5;

    // Don't do anything if the amount of words less than 100
    if (elementWords.length < 100) {
      return;
    }

    elementWords.forEach(function(word) {
      if ((blacklist.indexOf(word) === -1) && word.length > 1) {
        // Find existing word
        var existingWord = words.find(function(item) {
          return item.name === word;
        });

        // If word exists, add 1 to occurrences, else push new word to words
        if (existingWord) {
          existingWord.occurrences += 1;
        } else {
          words.push({name: word, occurrences: 1});
        }
      }
    });

    // Sort by most occurred
    words.sort(function(a, b) {
      if (a.occurrences < b.occurrences) {
        return 1;
      }
      if (a.occurrences > b.occurrences) {
        return -1;
      }
      return 0;
    });

    // Only use the top 10 words
    words.length = 10;

    words.forEach(function(word) {
      var wordSize = word.occurrences * 4;
      var p = document.createElement('p');

      if (wordSize > maxFontSize) {
        wordSize = maxFontSize;
      } else {
        wordSize = word.occurrences * 4;
      }

      p.innerText = word.name;
      p.style.fontSize = wordSize + 'px';

      wordCloudContainer.appendChild(p);
    });
  }

  wordCloud(document.querySelector('.words'));
}());
