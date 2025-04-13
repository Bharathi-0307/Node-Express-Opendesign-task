exports.seed = function(knex) {
    return knex('products').insert([
      {
        title: 'Premium Yoga Mat',
        description: 'Eco-friendly non-slip mat',
        price: 2999.00,
        category: 'Fitness',
        image_url: 'https://example.com/yoga-mat.jpg',
        published_at: new Date()
      },
      {
        title: 'Wireless Earbuds',
        description: 'Bluetooth 5.0 with noise cancellation',
        price: 5999.00,
        category: 'Electronics',
        image_url: 'https://example.com/earbuds.jpg',
        published_at: new Date()
      }
    ]);
  };