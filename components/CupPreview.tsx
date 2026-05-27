type ServeStyle = "hot" | "iced";
type CupVariant = "hero" | "small" | "pickup";

type LabelData = {
  number: string;
  title: string;
  persona: string;
  coreLine?: string;
};

type CupPreviewProps = {
  serveStyle: ServeStyle;
  labelData: LabelData;
  variant?: CupVariant;
  showOverlayLabel?: boolean;
};

export function CupPreview({ serveStyle, labelData, variant = "pickup", showOverlayLabel = true }: CupPreviewProps) {
  const isIced = serveStyle === "iced";
  const imageSrc = isIced ? "/public/images/cup-iced-clean.png" : "/public/images/cup-hot-clean.png";
  const imageAlt = isIced ? "Time Slice Coffee iced clear cup" : "Time Slice Coffee hot paper cup";

  return (
    <div className={`cup-preview cup-preview-${serveStyle} cup-preview-${variant}`}>
      <img src={imageSrc} alt={imageAlt} />
      {showOverlayLabel ? (
        <div className="cup-overlay-label">
          <span className="label-brand">TIME SLICE COFFEE</span>
          <span className="label-number">#{labelData.number}</span>
          <strong>{labelData.title}</strong>
          <span className="label-persona">{labelData.persona}</span>
          <small>Today’s Information Slice.</small>
        </div>
      ) : null}
    </div>
  );
}
