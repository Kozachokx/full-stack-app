function LoginDev() {
  return (
    <section className="dev-purposes">
      {/* <h2 className='collapsible'>Open quick login</h2> */}
      {/* <button type="button" className='collapsible'>Open quick login</button> */}

      <label htmlFor="check" className="toggle-button">Open quick login</label>

      <input type="checkbox" className='toggle-check' id="check"></input>
      <div className='collapsible-content'>
        <ul>
          <li>
            {/* <a href="/login?username=johnny&password=SecretPass" in target="_blank" rel="noopener noreferrer"> */}
            <a href="/login?username=johnny&password=SecretPass">
              User Admin
            </a>
          </li>
          <li>
            <a href="/login?username=createdguest&password=SecretPass">
              User Guest
            </a>
          </li>
        </ul>
        <span style={{ fontSize: '14px' }}>(Right-click on this to open in incognito)</span>
      </div>
    </section>
  );
}

export default LoginDev;
