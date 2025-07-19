const keySelect = document.getElementById('key-select');
const numChordsInput = document.getElementById('num-chords');
const generateBtn = document.getElementById('generate-btn');
const chordProgressionDisplay = document.getElementById('chord-progression');

const majorScaleChords = {
    C: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
    G: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
    D: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
    A: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
    E: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
    B: ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#dim'],
    'F#': ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'E#dim'],
    'C#': ['C#', 'D#m', 'E#m', 'F#', 'G#', 'A#m', 'B#dim'],
    F: ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'],
    'Bb': ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim'],
    'Eb': ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'Ddim'],
    'Ab': ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'Gdim'],
    'Db': ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm', 'Cdim'],
    'Gb': ['Gb', 'Abm', 'Bbm', 'Cb', 'Db', 'Ebm', 'Fdim'],
    'Cb': ['Cb', 'Dbm', 'Ebm', 'Fb', 'Gb', 'Abm', 'Bbdim']
};

generateBtn.addEventListener('click', generateChordProgression);

function generateChordProgression() {
    const selectedKey = keySelect.value;
    const numChords = parseInt(numChordsInput.value);

    if (isNaN(numChords) || numChords < 2 || numChords > 8) {
        alert('コード数は2から8の間で入力してください。');
        return;
    }

    const availableChords = majorScaleChords[selectedKey];
    if (!availableChords) {
        chordProgressionDisplay.textContent = '選択されたキーのコードが見つかりません。';
        return;
    }

    let progression = [];
    for (let i = 0; i < numChords; i++) {
        const randomIndex = Math.floor(Math.random() * availableChords.length);
        progression.push(availableChords[randomIndex]);
    }

    chordProgressionDisplay.textContent = progression.join(' - ');
}

// Initial generation
generateChordProgression();