import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function App() {
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setImages(prev =>
      prev.concat(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    }
  });

  // Função para enviar a imagem para o S3
  // Substitua a URL e credenciais conforme necessário
  // const uploadToS3 = async (file) => {
  //   // Exemplo de upload usando fetch para um endpoint backend que faz proxy para o S3
  //   // const formData = new FormData();
  //   // formData.append('file', file);
  //   // const response = await fetch('URL_DO_SEU_BACKEND/upload', {
  //   //   method: 'POST',
  //   //   body: formData
  //   // });
  //   // const result = await response.json();
  //   // console.log(result);
  // };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 0,
      fontFamily: "sans-serif",
      background: "#000",
      minHeight: "100vh",
      color: "#ccc"
    }}>
      <h2>Upload de Imagens (Drag & Drop)</h2>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #888",
          borderRadius: 10,
          padding: 40,
          width: 400,
          textAlign: "center",
          background: "#000",
          cursor: "pointer",
          marginBottom: 24
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Solte a imagem aqui...</p>
        ) : (
          <p>Arraste uma imagem ou clique para selecionar.</p>
        )}
      </div>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        justifyContent: "center"
      }}>
        {images.map((file, i) => (
          <div key={i} style={{textAlign: "center"}}>
            <img
              src={file.preview}
              style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 6, border: "1px solid #ccc" }}
              alt={file.name}
              onLoad={() => URL.revokeObjectURL(file.preview)}
            />
            <div style={{fontSize: 12, marginTop: 6}}>{file.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;