async function saveFileToCFT(file, hash) {
  const targetFolderPath = '../CFT'; // Ścieżka do folderu CFT

  try {
    // Sprawdź, czy folder docelowy istnieje, jeśli nie, utwórz go
    const folderHandle = await getFileHandle(targetFolderPath, { create: true });

    // Wygeneruj ścieżkę docelową pliku w folderze CFT
    const targetFilePath = `${targetFolderPath}/${hash}.${getExtension(file.name)}`;

    // Zapisz plik do folderu CFT
    await writeFile(folderHandle, targetFilePath, file.data);

    console.log('Plik został pomyślnie zapisany w folderze CFT.');
  } catch (error) {
    console.error('Wystąpił błąd podczas zapisywania pliku w folderze CFT:', error);
  }
}

// Funkcja pomocnicza do uzyskiwania dostępu do folderu
async function getFileHandle(path, options) {
  try {
    const handle = await window.showDirectoryPicker();
    const parts = path.split('/');
    return getDirectory(handle, parts, options);
  } catch (error) {
    console.error('Wystąpił błąd podczas uzyskiwania dostępu do folderu:', error);
    return null;
  }
}

// Funkcja pomocnicza do rekurencyjnego uzyskiwania dostępu do folderu
async function getDirectory(handle, parts, options) {
  if (parts.length === 0) {
    return handle;
  }

  const [name, ...rest] = parts;

  try {
    const directoryHandle = await handle.getDirectoryHandle(name, options);
    return getDirectory(directoryHandle, rest, options);
  } catch (error) {
    console.error('Wystąpił błąd podczas uzyskiwania dostępu do folderu:', error);
    return null;
  }
}

// Funkcja pomocnicza do zapisu pliku
async function writeFile(folderHandle, filePath, data) {
  try {
    const fileHandle = await folderHandle.getFileHandle(filePath, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(data);
    await writable.close();
  } catch (error) {
    console.error('Wystąpił błąd podczas zapisywania pliku:', error);
  }
}

function getExtension(filename) {
  return filename.split('.').pop();
}

export default saveFileToCFT;
