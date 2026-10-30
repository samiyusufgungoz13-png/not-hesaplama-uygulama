# not-hesaplama-uygulama# KBÜ Not Hesaplayıcı - JavaScript Projesi

Bu proje, Karabük Üniversitesi (KBÜ) başarı ve geçme yönetmeliğine uygun olarak öğrencinin yıl içi ve final/bütünleme notlarını işleyerek başarı notunu, harf aralığını ($A1, A2, B1, B2, C, F1, F2, F3$) ve geçme/kalma durumunu otomatik olarak hesaplayan web tabanlı bir uygulamadır[span_3](start_span)[span_3](end_span)[span_4](start_span)[span_4](end_span).

## Kullanım Talimatı
1. Proje klasöründeki `index.html` dosyasını herhangi bir web tarayıcısında (Chrome, Edge, Firefox vb.) açın.
2. İlgili alanlara **Yıl İçi (Vize)** ve **Final/Bütünleme** notlarınızı girin (0-100 arası).
3. Eğer bütünlemeye girilmediyse ilgili kutucuğu işaretleyerek yıl içi notunuzun final yerine geçmesini sağlayabilirsiniz[span_5](start_span)[span_5](end_span).
4. Devamsızlık veya sınava girmeme durumları varsa ilgili kutucukları seçebilirsiniz[span_6](start_span)[span_6](end_span).
5. **Hesaplama** butonuna basın veya klavyeden **Enter** tuşunu tuşlayın[span_7](start_span)[span_7](end_span). Sonuçlar kart içerisinde anında görüntülenecektir[span_8](start_span)[span_8](end_span).

## Test Senaryoları (Beklenen Sonuçlar)
1. **Yıl İçi 70, Final 60:**
   * Hesaplama: $(70 \times 0.40) + (60 \times 0.60) = 28 + 36 = 64 \rightarrow C$[span_9](start_span)[span_9](end_span)
   * Durum: Geçti[span_10](start_span)[span_10](end_span)[span_11](start_span)[span_11](end_span)
2. **Yıl İçi 95, Final 48:**
   * Final $< 50$ olduğu için $F3$ (Kaldı)[span_12](start_span)[span_12](end_span)[span_13](start_span)[span_13](end_span).
3. **Yıl İçi 58, Bütünleme 55 (Bütünleme girilmemiş, yıl içi kabul edilmiş):**
   * Hesaplama: Sınav = $55$, Başarı = $(58 \times 0.40) + (55 \times 0.60) = 23.2 + 33 = 56.2 \rightarrow F3$ (Başarı $< 60$)[span_14](start_span)[span_14](end_span)[span_15](start_span)[span_15](end_span).
4. **Devamsız İşaretli:**
   * $F1$ (Kaldı)[span_16](start_span)[span_16](end_span)[span_17](start_span)[span_17](end_span).
5. **Devamsız Var, Sınava Girmedi:**
   * $F2$ (Kaldı)[span_18](start_span)[span_18](end_span)[span_19](start_span)[span_19](end_span).

## Teknik Özellikler
* Sadece saf **HTML5**, **CSS3** ve **JavaScript (Vanilla JS)** kullanılmıştır (Harici kütüphane/çerçeve yoktur)[span_20](start_span)[span_20](end_span).
* Mobil uyumlu (Responsive, min-width 320px) arayüze sahiptir[span_21](start_span)[span_21](end_span).
* Kapsamlı hata denetimleri ve kullanıcı dostu hata mesajları içerir[span_22](start_span)[span_22](end_span).
