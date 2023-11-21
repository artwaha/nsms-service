import { Helmet } from "react-helmet";

const Seo = ({ title, description }) => {
  return (
    <Helmet>
      <title>NSMS | {title}</title>
      <meta name="description" charSet="utf-8" content={description} />
    </Helmet>
  );
};

export default Seo;
