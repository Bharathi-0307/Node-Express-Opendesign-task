exports.seed = function(knex) {
  return knex('products').insert([
    {
      title: 'Premium Yoga Mat',
      description: 'Eco-friendly non-slip mat',
      content: 'This yoga mat is made from eco-friendly material, offering a non-slip surface that ensures a great workout experience.',
      category: 'Fitness',
      price: 2999.00,
      image_url: 'https://example.com/yoga-mat.jpg',
      published_at: new Date(),
      created_at: new Date()
    },
    {
      title: 'Wireless Earbuds',
      description: 'Bluetooth 5.0 with noise cancellation',
      content: 'These wireless earbuds feature Bluetooth 5.0 for seamless connectivity and noise cancellation for better audio clarity.',
      category: 'Electronics',
      price: 5999.00,
      image_url: 'https://example.com/earbuds.jpg',
      published_at: new Date(),
      created_at: new Date()
    }
  ]);
};
