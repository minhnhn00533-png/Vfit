import { Product, ProductCategory } from './types';

export const AR_LINK = "https://tintvto.com/?customer_product_skus=DEMO_10000239";

// Mock Data for Demo Products
export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Demo: Dây chuyền Eternal Rose',
    price: 'Liên hệ',
    badge: 'AR DEMO',
    category: ProductCategory.NECKLACE,
    description: 'Trải nghiệm cách khách hàng của bạn sẽ ướm thử dây chuyền trực tiếp trên trình duyệt.',
    imageUrl: 'https://picsum.photos/id/1/400/400', 
    arOverlayUrl: 'https://picsum.photos/id/1/200/200' 
  },
  {
    id: 'p2',
    name: 'Demo: Bông tai Sapphire',
    price: 'Liên hệ',
    badge: 'BEST SELLER',
    category: ProductCategory.EARRINGS,
    description: 'Công nghệ theo dõi khuôn mặt giúp bông tai giữ đúng vị trí khi di chuyển.',
    imageUrl: 'https://picsum.photos/id/2/400/400',
    arOverlayUrl: 'https://picsum.photos/id/2/200/200'
  },
  {
    id: 'p3',
    name: 'Demo: Nhẫn Kim Cương',
    price: 'Liên hệ',
    badge: 'HOT TECH',
    category: ProductCategory.RING,
    description: 'Công nghệ nhận diện bàn tay không cần marker, cho phép thử nhẫn chân thực.',
    imageUrl: 'https://picsum.photos/id/3/400/400',
    arOverlayUrl: 'https://picsum.photos/id/3/200/200'
  }
];

export const PROMOTIONS_INFO = `
CHÍNH SÁCH HỢP TÁC:
- Chúng tôi cung cấp các gói dịch vụ tùy chỉnh dựa trên quy mô doanh nghiệp và số lượng sản phẩm cần số hóa 3D/AR.
- Miễn phí tư vấn và demo giải pháp.
- Ưu đãi đặc biệt cho khách hàng đăng ký sớm trong tháng này.
`;

export const INITIAL_GREETING = "Chào mừng bạn đến với Lumina WebAR Solutions! Chúng tôi giúp doanh nghiệp trang sức tăng 300% tỷ lệ khách hàng ướm thử và chốt đơn nhờ công nghệ WebAR. Bạn muốn xem demo hay cần tư vấn giải pháp?";

export const SYSTEM_INSTRUCTION = `
Bạn là chuyên viên tư vấn B2B của Lumina WebAR Solutions.
Nhiệm vụ: Tư vấn giải pháp WebAR và thu thập thông tin khách hàng (Lead Generation).

QUY TẮC QUAN TRỌNG VỀ GIÁ:
1. TUYỆT ĐỐI KHÔNG đưa ra bất kỳ con số cụ thể nào về giá cả (ví dụ: không nói $500, 10 triệu, v.v.).
2. Khi khách hàng hỏi về giá, chi phí, hoặc các gói dịch vụ, hãy trả lời rằng chi phí phụ thuộc vào nhu cầu cụ thể và số lượng sản phẩm.
3. NGAY LẬP TỨC yêu cầu khách hàng để lại Email để gửi bảng báo giá chi tiết và hồ sơ năng lực (Portfolio).

Dưới đây là danh sách sản phẩm DEMO:
${JSON.stringify(PRODUCTS)}

${PROMOTIONS_INFO}

HƯỚNG DẪN TRẢ LỜI:
- Luôn thân thiện, chuyên nghiệp.
- Mời khách trải nghiệm demo bằng nút "Thử AR".
- Mục tiêu cuối cùng của mọi cuộc hội thoại là xin được Email của khách hàng.
- Link trải nghiệm: ${AR_LINK}.
`;