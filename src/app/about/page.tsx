import React from 'react';
import styles from './page.module.css';

export default function AboutPage() {
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '50px' }}>

            {/* Header Strip */}
            <div className={styles.about_header}>
                <h1 className={styles.about_title}>Hakkımızda</h1>
            </div>

            {/* Content Container */}
            <div className="container">
                <div className={styles.content_wrapper}>

                    {/* Intro Section */}
                    <div style={{ marginBottom: '40px' }}>
                        <h2 className={styles.section_heading}>İnşaat Malzemeleri ve İzolasyon Sektöründe Başarılı Bir Gelişim</h2>
                        <p style={{ marginBottom: '15px' }}>
                            Sandviç Panelci olarak sektörün öncüsü vizyonumuzla her daim en kaliteli yalıtım malzemelerini tedarik ediyoruz. O dönemin şartlarında yeni gelişmekte olan ve modern yapıların inşaatına başlandığı dönemde gerek duyulan inşaat malzemelerinin temini konusunda başarılı bir şekilde ticaret hayatını sürdürmüştür.
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            Gelişen teknoloji ve inşaat sektörü nedeni ile firmamızda gelişmesini sürdürmüş ve inşaat malzemeleri ile izolasyon malzemeleri konusundaki ticaret sürecini başarılı şekilde yürütmüş ve büyümesini devam ettirmiştir. İstanbul’da birçok konutun inşasını gerçekleştirmiştir. İnşaat, inşaat malzemeleri ve izolasyon malzemeleri konusunda oldukça başarılı ve büyük bir firma olma yolunda önemli adımlar atmıştır.
                        </p>
                        <p>
                            Sandviç Panelci günümüzde İstanbul başta olmak üzere Türkiye'nin birçok şehrine inşaat ve izolasyon malzemelerinin temini konusunda hizmet sunabilmektedir. Büyük depolama tesisleri ile yüksek stok rakamlarına ulaşmış durumdadır. İnşaatlar için gerekli olabilecek oldukça geniş bir ürün çeşidi ile ticaret hayatını sürdürmektedir. Sürekli olarak gelişen inşaat sektörünü ve teknolojik yenilikleri takip ederek ürün seçeneklerinin sürekli genişlemesini sağlamaktadır. Bu sebepler ile sektöründe oldukça önemli bir noktaya ulaşmış ve çok fazla ilgi gören bir adres haline gelmiştir. Müşteri memnuniyeti konusunda sürdürülen başarılı çalışmalarımız ile kaliteli ve uygun fiyatlı ürünler ile inşaat sektörünün ihtiyaç duyduğu konularda önemli hizmetler sunmaktadır. Gerekli durumlarda teknik olarak destek verilmesi ve danışmanlık yapılması da firmamızın uzman çalışan kadrosu ile mümkün olmaktadır. Her sene düzenli artan satışları ve büyümesi ile sektöründe oldukça önemli bir yere ulaşmış ve bunu daha ilerileri götürmeyi amaç olarak benimsemiştir.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
