import { Card, Button, Image } from 'antd';

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Detail = () => {
  const { Meta } = Card;
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch('http://localhost:8080/api/products/' + id)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);
  console.log(product);

  return (
    <div>
      <Button
        style={{
          marginTop: '10px',
          marginLeft: '10px',
        }}
        className="link-no-underline"
        type="primary"
        danger
      >
        <Link className="link-no-underline" to={'/'}>
          Home
        </Link>
      </Button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '20px',
        }}
      >
        <Card style={{ width: 400 }}>
          Delete
          <Image src={product.image} />
          <Card.Meta
            style={{
              paddingBottom: 10,
              fontSize: 22,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
            description={product.name}
          />
          <Card.Meta
            style={{ paddingBottom: 8, fontSize: 15 }}
            description={product.year}
          />
          <Card.Meta
            style={{ paddingBottom: 8, fontSize: 15 }}
            description={product.demo_link}
          />
          <Card.Meta
            style={{ paddingBottom: 8, fontSize: 15 }}
            description={product.source_code_link}
          />
          <Card.Meta
            style={{ paddingBottom: 8, fontSize: 15 }}
            description={product.desc}
          />
        </Card>
      </div>
    </div>
  );
};

export default Detail;
