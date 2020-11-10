import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    console.log(uploadedFiles)
    if(uploadedFiles.length > 0){
      const data = new FormData();
      uploadedFiles.forEach((file) => data.append('file', file));

      try {
        await api.post('/transactions/import', data);
        history.push('/');
      } catch (err) {
        console.log(err.response.error);
      }
    } else {
      console.log('É necessário anexar um arquivo.')
    }
  }

  function submitFile(files: FileProps[]): void {
    setUploadedFiles(files);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
