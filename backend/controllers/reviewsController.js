const reviews = require('../data/mockReviews.json');

exports.getReviews = (req, res) => {
  const { rating, category, channel, search } = req.query;
  let filtered = [...reviews];

  if (rating) filtered = filtered.filter(r => r.rating >= parseFloat(rating));
  if (category)
    filtered = filtered.filter(r => r.reviewCategory.some(c => c.category === category));
  if (channel) filtered = filtered.filter(r => r.channel === channel);
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(r =>
      (r.publicReview && r.publicReview.toLowerCase().includes(s)) ||
      (r.guestName && r.guestName.toLowerCase().includes(s)) ||
      (r.listingName && r.listingName.toLowerCase().includes(s))
    );
  }

  const normalized = filtered.map(r => ({
    id: r.id,
    property: r.listingName,
    reviewer: r.guestName,
    rating: r.rating,
    categories: r.reviewCategory,
    channel: r.channel,
    reviewText: r.publicReview,
    submittedAt: new Date(r.submittedAt).toISOString(),
    approved: !!r.approved
  }));

  res.json({ status: 'success', data: normalized });
};
