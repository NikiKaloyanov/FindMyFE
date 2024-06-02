import "./MarkerImage.css";

type Props = {
  initials: string;
  image?: string;
};

const MarkerImage = (props: Props) => {
  return (
    <div className="marker-background">
      {props.image ? (
        <img alt={"Profile image of " + props.initials} src={props.image} />
      ) : (
        props.initials
      )}
    </div>
  );
};

export default MarkerImage;
