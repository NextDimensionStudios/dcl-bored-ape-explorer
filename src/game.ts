//------ Base scene ------//
const baseScene = new Entity();
baseScene.addComponent(new GLTFShape('models/baseScene.glb'));
baseScene.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0)
  })
);
engine.addEntity(baseScene);

//------ Ape Display ------//
const nftUri = 'ethereum://0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/3871';
const apeNft = new Entity();

apeNft.addComponent(new NFTShape(nftUri));
apeNft.addComponent(
  new Transform({
    position: new Vector3(5, 2.5, 8),
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

//------ Ape Traits ------/
const url = 'https://api.opensea.io/api/v1/assets';
const tokenId = '6988';
const contractAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';

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
  let traitPosition = new Vector3(0.4, 0.15, 0);
  let deltaX = 0;
  let deltaY = 0;
  let index = 0;

  for (let trait of json.assets[0].traits) {
    const key = new TextShape(trait.trait_type);
    key.color = Color3.Black();
    key.font = new Font(Fonts.SanFrancisco_Semibold);

    const value = new TextShape(trait.value);
    value.font = new Font(Fonts.SanFrancisco_Heavy);
    value.color = Color3.Black();

    const traitName = new Entity();
    traitName.addComponent(key);
    traitName.addComponent(
      new Transform({
        position: traitPosition.add(new Vector3(deltaX, 0 + deltaY, 0)),
        scale: new Vector3(0.04, 0.04, 0.1)
      })
    );
    traitName.setParent(apeNft);
    engine.addEntity(traitName);

    const traitValue = new Entity();
    traitValue.addComponent(value);
    traitValue.addComponent(
      new Transform({
        position: traitPosition.add(new Vector3(deltaX, -0.07 + deltaY, 0)),
        scale: new Vector3(0.04, 0.04, 0.1)
      })
    );
    traitValue.setParent(apeNft);
    engine.addEntity(traitValue);

    index++;
    deltaX += 0.3;
    if (index % 4 == 0) {
      deltaX = 0;
      deltaY -= 0.25;
    }
  }
}
