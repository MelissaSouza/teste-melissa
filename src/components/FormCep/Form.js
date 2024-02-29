import React, { useState, useEffect } from "react";

export default function FormCep() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [apelido, setApelido] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [isValid, setisValid] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  function limpar() {
    setBairro("");
    setCidade("");
    setLogradouro("");
    setUf("");
  }

  function isEmpty(e) {
    const { value } = e.target;

    if (value?.split() !== "") {
      setNumero(value);
    }
  }
  function onFocusCep(e) {
    e.target.style.border = "3px solid transparent";
  }

  function wrongCEP() {
    const cep = document.querySelector("[name='cep']");
    cep.style.border = "3px solid #df4759";
    limpar();
  }
  
function verficaCep(cep) {
  setisValid(false);
  fetch(`https://viacep.com.br/ws/${cep}/json`)
    .then((res) => res.json())
    .then((data) => {
      setLogradouro(data.logradouro);
      setCidade(data.localidade);
      setBairro(data.bairro);
      setUf(data.uf);

      if (!data.erro) {
        setisValid(true);

        // Exportar CEP para o localStorage
        localStorage.setItem("Cep", cep);
      } else {
        wrongCEP();
      }
      setFetchError(false);
    })
    .catch((err) => setFetchError(true));
}

  function onBlurCep(ev) {
    const { value } = ev.target;

    const cep = value?.replace(/[^0-9]/g, "");
    if (cep?.length !== 8) {
      wrongCEP();
      return;
    }
    verficaCep(cep);
  }

  function onSubmitForm(e) {
    e.preventDefault();

    // Salvando os dados no localStorage
    const formData = {
      nomeCompleto,
      apelido,
      logradouro,
      bairro,
      cidade,
      uf,
      numero,
      complemento,
    };

    localStorage.setItem("formData", JSON.stringify(formData));
  }

  useEffect(() => {
    // Para carregar os dados do localStorage
    const storedData = localStorage.getItem("formData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setNomeCompleto(parsedData.nomeCompleto || "");
      setApelido(parsedData.apelido || "");
      setLogradouro(parsedData.logradouro || "");
      setBairro(parsedData.bairro || "");
      setCidade(parsedData.cidade || "");
      setUf(parsedData.uf || "");
      setNumero(parsedData.numero || "");
      setComplemento(parsedData.complemento || "");
    }
  }, []);

  return (
    <div className="FormCep">
      {fetchError && (
        <p className="errorMessage">
          <strong>
            Erro de conexãocom o servidor,
            <br />
            tente novamente mais tarde
          </strong>
        </p>
      )}
      <form onSubmit={onSubmitForm}>
        <div className="two">
          <div className="container">
            <label>Nome Completo</label>
            <input
              onChange={(e) => setNomeCompleto(e.target.value)}
              value={nomeCompleto}
              name="nomeCompleto"
              type="text"
              required
            />
          </div>

          <div className="container">
            <label>Apelido</label>
            <input
              onChange={(e) => setApelido(e.target.value)}
              value={apelido}
              name="apelido"
              type="text"
            />
          </div>
        </div>

        <div className="three">
          <div className="container">
            <label>Cep</label>
            <input
              onChange={onFocusCep}
              onBlur={onBlurCep}
              placeholder="00000-000"
              name="cep"
              type="text"
            ></input>
          </div>

          <div className="container">
            <label>Logradouro</label>
            <input
              value={logradouro}
              name="logradouro"
              readOnly={true}
              type="text"
            ></input>
          </div>

          <div className="container">
            <label>Número</label>
            <input
              onChange={isEmpty}
              readOnly={!isValid}
              name="numero"
              type="text"
            ></input>
          </div>
        </div>
        <div className="two">
          <div className="container">
            <label>Complemento</label>
            <input readOnly={!isValid} name="complemento" type="text"></input>
          </div>

          <div className="container">
            <label>Bairro</label>

            <input
              readOnly={true}
              value={bairro}
              name="bairro"
              type="text"
            ></input>
          </div>
        </div>
        <div className="onet">
          <div className="container">
            <label>Cidade</label>
            <input
              readOnly={true}
              value={cidade}
              name="cidade"
              type="text"
            ></input>
          </div>
          <div className="container">
            <label>UF</label>
            <select readOnly={true} value={uf} name="uf">
              <option value="">-</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
          </div>
        </div>

        <div>
        <button onClick={limpar} type="reset">
            Reset
          </button>
          <button type="submit" disabled={!isValid || !numero}>
            Enviar
          </button>
        </div>
      </form>

      <div>
        <h2>Endereços:</h2>
        <p>Nome Completo: {nomeCompleto}</p>
        <p>Apelido: {apelido}</p>
        <p>CEP: {}</p>
        <p>Logradouro: {logradouro}</p>
        <p>Bairro: {bairro}</p>
        <p>Cidade: {cidade}</p>
        <p>UF: {uf}</p>
        <p>Número: {numero}</p>
        <p>Complemento: {complemento}</p>
      </div>
    </div>
  );
}
