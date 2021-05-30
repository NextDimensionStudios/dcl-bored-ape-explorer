export function ConfigureBoredApeExplorer() {
  //------ Ape Display ------//
  const url = 'https://api.opensea.io/api/v1/assets';
  const tokenId = '1111';
  const contractAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
  const nftUri = 'ethereum://' + contractAddress + '/' + tokenId;

  //------ Case ------//
  const nftCase = new Entity();
  nftCase.addComponent(new GLTFShape('models/BoredApeExplorerCase.glb'));
  nftCase.addComponent(
    new Transform({
      position: new Vector3(8, 0, 8)
    })
  );
  engine.addEntity(nftCase);

  //------ NFT Display ------//
  const apeNft = new Entity();
  apeNft.addComponent(new NFTShape(nftUri));
  apeNft.addComponent(
    new Transform({
      position: new Vector3(4.75, 2.9, 8),
      scale: new Vector3(6, 6, 6)
    })
  );
  apeNft.addComponent(
    new OnPointerDown(
      () => {
        openNFTDialog(nftUri);
      },
      { showFeedback: false }
    )
  );

  engine.addEntity(apeNft);

  executeTask(async () => {
    try {
      let response = await fetch(
        url + `?token_ids=${tokenId}&asset_contract_address=${contractAddress}`
      );
      let json = await response.json();
      ConfigureTraitDisplay(json);
    } catch (e) {
      log(e + '\nfailed to reach URL');
    }
  });

  function ConfigureTraitDisplay(json: any) {
    //------ Add Serial # ------//
    const serial = new TextShape('#' + tokenId);
    serial.color = Color3.White();
    serial.font = new Font(Fonts.SanFrancisco_Heavy);

    const serialDisplay = new Entity();
    serialDisplay.addComponent(serial);
    serialDisplay.addComponent(
      new Transform({
        position: new Vector3(9.72, 4.45, 8),
        scale: new Vector3(0.5, 0.5, 0.5)
      })
    );
    engine.addEntity(serialDisplay);

    //------ Add Traits ------//
    let traitPosition = new Vector3(0.465, 0.15, 0);
    let deltaX = 0;
    let deltaY = 0;
    let index = 0;

    for (let trait of json.assets[0].traits) {
      const key = new TextShape(trait.trait_type);
      key.color = Color3.White();
      key.font = new Font(Fonts.SanFrancisco_Semibold);

      const value = new TextShape(trait.value);
      value.font = new Font(Fonts.SanFrancisco_Heavy);
      value.color = Color3.White();

      const traitName = new Entity();
      traitName.addComponent(key);
      traitName.addComponent(
        new Transform({
          position: traitPosition.add(new Vector3(deltaX, 0 + deltaY, 0)),
          scale: new Vector3(0.03, 0.03, 0.1)
        })
      );
      traitName.setParent(apeNft);
      engine.addEntity(traitName);

      const traitValue = new Entity();
      traitValue.addComponent(value);
      traitValue.addComponent(
        new Transform({
          position: traitPosition.add(new Vector3(deltaX, -0.05 + deltaY, 0)),
          scale: new Vector3(0.03, 0.03, 0.1)
        })
      );
      traitValue.setParent(apeNft);
      engine.addEntity(traitValue);

      index++;
      deltaX += 0.37;
      if (index % 3 == 0) {
        deltaX = 0;
        deltaY -= 0.165;
      }
    }
  }
}
