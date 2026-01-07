import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const photos = [
  'https://cdn.poehali.dev/projects/b2656e33-bfa8-4ece-a6b3-0ca608dd26b6/files/b5171642-551c-455f-a0ce-cf3f51d81cfd.jpg',
  'https://cdn.poehali.dev/projects/b2656e33-bfa8-4ece-a6b3-0ca608dd26b6/files/abf3ea07-a881-49d7-86db-3a7a652fc77c.jpg',
  'https://cdn.poehali.dev/projects/b2656e33-bfa8-4ece-a6b3-0ca608dd26b6/files/f5a8bc06-a221-4963-b717-305936a07c6c.jpg',
];

interface FloatingPhoto {
  id: number;
  url: string;
  angle: number;
  distance: number;
  rotation: number;
  scale: number;
  speed: number;
  zIndex: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [floatingPhotos, setFloatingPhotos] = useState<FloatingPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [photoRotation, setPhotoRotation] = useState(0);
  const [bookingDate, setBookingDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const generateFloatingPhotos = () => {
      const newPhotos: FloatingPhoto[] = [];
      const photoCount = 40;
      
      for (let i = 0; i < photoCount; i++) {
        const angle = (360 / photoCount) * i + Math.random() * 20;
        const distance = 30 + Math.random() * 70;
        
        newPhotos.push({
          id: i,
          url: photos[i % photos.length],
          angle,
          distance,
          rotation: Math.random() * 360,
          scale: 0.4 + Math.random() * 0.6,
          speed: 12 + Math.random() * 12,
          zIndex: Math.floor(distance),
        });
      }
      setFloatingPhotos(newPhotos);
    };

    generateFloatingPhotos();
  }, []);

  const services = [
    { icon: 'Camera', title: 'Свадебная съемка', price: 'от 50 000 ₽', description: 'Полный день съемки с художественной обработкой' },
    { icon: 'Users', title: 'Семейная фотосессия', price: 'от 15 000 ₽', description: '2 часа съемки, все обработанные фото' },
    { icon: 'Heart', title: 'Love Story', price: 'от 20 000 ₽', description: 'Романтическая фотосессия для пары' },
    { icon: 'Baby', title: 'Детская съемка', price: 'от 12 000 ₽', description: 'Естественные эмоции ваших детей' },
    { icon: 'Briefcase', title: 'Деловой портрет', price: 'от 8 000 ₽', description: 'Профессиональные фото для резюме' },
    { icon: 'Sparkles', title: 'Индивидуальная съемка', price: 'от 10 000 ₽', description: 'Персональная фотосессия в любом стиле' },
  ];

  const collections = [
    { name: 'Свадьбы', count: 156, gradient: 'from-pink-500 to-rose-500' },
    { name: 'Портреты', count: 342, gradient: 'from-purple-500 to-indigo-500' },
    { name: 'Семья', count: 189, gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Fashion', count: 267, gradient: 'from-orange-500 to-red-500' },
  ];

  const reviews = [
    { name: 'Анна Петрова', rating: 5, text: 'Невероятные фотографии с нашей свадьбы! Профессионализм на высшем уровне.', avatar: '👰' },
    { name: 'Михаил Сидоров', rating: 5, text: 'Отличная работа с детьми, получились живые и естественные кадры.', avatar: '👨' },
    { name: 'Елена Иванова', rating: 5, text: 'Очень довольны результатом семейной фотосессии. Рекомендуем!', avatar: '👩' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <style>
          {floatingPhotos.map((photo) => {
            const x = Math.cos((photo.angle * Math.PI) / 180) * photo.distance;
            const y = Math.sin((photo.angle * Math.PI) / 180) * photo.distance;
            return `
              @keyframes fly-${photo.id} {
                0% { 
                  transform: translate(-50%, -50%) translate(0vw, 0vh) rotate(0deg) scale(0.1);
                  opacity: 0;
                  filter: blur(10px);
                }
                5% {
                  opacity: 0.8;
                }
                95% {
                  opacity: 0.8;
                }
                100% { 
                  transform: translate(-50%, -50%) translate(${x * 1.5}vw, ${y * 1.5}vh) rotate(${photo.rotation * 2}deg) scale(${photo.scale * 1.5});
                  opacity: 0;
                  filter: blur(5px);
                }
              }
            `;
          }).join('\n')}
        </style>
        
        <div className="absolute inset-0 flex items-center justify-center">
          {floatingPhotos.map((photo) => {
            const x = Math.cos((photo.angle * Math.PI) / 180) * photo.distance;
            const y = Math.sin((photo.angle * Math.PI) / 180) * photo.distance;
            
            return (
              <div
                key={photo.id}
                className="absolute cursor-pointer transition-all duration-500 hover:scale-125 hover:z-50 hover:opacity-100"
                style={{
                  left: '50%',
                  top: '50%',
                  animation: `fly-${photo.id} ${photo.speed}s ease-out infinite`,
                  animationDelay: `${(photo.id / floatingPhotos.length) * photo.speed}s`,
                  zIndex: photo.zIndex,
                  width: '150px',
                  height: '150px',
                }}
                onClick={() => {
                  setSelectedPhoto(photo.url);
                  setPhotoRotation(0);
                }}
              >
                <img 
                  src={photo.url} 
                  alt="" 
                  className="w-full h-full object-cover rounded-xl shadow-2xl border-2 border-white/30" 
                />
              </div>
            );
          })}
        </div>
        
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                opacity: 0.3 + Math.random() * 0.7,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 border-b border-purple-200/50 shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Camera" className="text-primary" size={32} />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  PhotoArt Studio
                </span>
              </div>
              <div className="hidden md:flex gap-8">
                {['Портфолио', 'Услуги', 'Коллекции', 'Отзывы', 'Контакты'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveSection(item.toLowerCase())}
                    className="text-foreground/80 hover:text-primary transition-colors font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                    <Icon name="Calendar" size={18} className="mr-2" />
                    Забронировать
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Бронирование фотосессии</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input id="name" placeholder="Введите ваше имя" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" placeholder="+7 (___) ___-__-__" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Выберите дату</Label>
                      <Calendar mode="single" selected={bookingDate} onSelect={setBookingDate} className="rounded-md border" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="service">Тип фотосессии</Label>
                      <select id="service" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2">
                        <option>Свадебная съемка</option>
                        <option>Семейная фотосессия</option>
                        <option>Love Story</option>
                        <option>Детская съемка</option>
                        <option>Деловой портрет</option>
                        <option>Индивидуальная съемка</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Комментарий</Label>
                      <Textarea id="message" placeholder="Расскажите о ваших пожеланиях" rows={3} />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                      Отправить заявку
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </nav>

        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg px-6 py-2 shadow-lg">
                Профессиональная фотография
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white leading-tight drop-shadow-2xl">
                Моменты,<br />которые остаются навсегда
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-lg">
                Создаю уникальные фотоистории, которые передают эмоции и сохраняют важные мгновения вашей жизни
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-lg px-8 py-6 shadow-2xl">
                      <Icon name="Calendar" size={20} className="mr-2" />
                      Забронировать съемку
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Button size="lg" className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 text-lg px-8 py-6 shadow-xl">
                  <Icon name="Image" size={20} className="mr-2" />
                  Смотреть портфолио
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 backdrop-blur-md bg-white/10">
          <div className="container mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 text-white drop-shadow-lg">
              Интерактивная галерея
            </h2>
            <p className="text-center text-white/80 mb-12 text-lg drop-shadow-md">
              Кликайте на фотографии — вращайте, листайте, разворачивайте
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {photos.map((photo, idx) => (
                <Card
                  key={idx}
                  className="overflow-hidden group cursor-pointer backdrop-blur-md bg-white/20 border-2 border-white/30 hover:border-pink-400 hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  onClick={() => {
                    setSelectedPhoto(photo);
                    setPhotoRotation(0);
                  }}
                >
                  <CardContent className="p-0 relative">
                    <img
                      src={photo}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-pink-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="text-white flex items-center gap-2">
                        <Icon name="Maximize2" size={24} />
                        <span className="text-lg font-semibold">Открыть</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 text-white drop-shadow-lg">
              Услуги и цены
            </h2>
            <p className="text-center text-white/80 mb-12 text-lg drop-shadow-md">
              Профессиональная фотосъемка для любого случая
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <Card
                  key={idx}
                  className="backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Icon name={service.icon as any} size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
                    <p className="text-3xl font-bold text-pink-400 mb-3">{service.price}</p>
                    <p className="text-white/80">{service.description}</p>
                    <Button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg">
                      Забронировать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 backdrop-blur-md bg-white/10">
          <div className="container mx-auto">
            <h2 className="text-5xl font-bold text-center mb-12 text-white drop-shadow-lg">
              Коллекции
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {collections.map((collection, idx) => (
                <Card
                  key={idx}
                  className={`relative overflow-hidden h-64 cursor-pointer group hover:shadow-2xl transition-all duration-500 animate-fade-in`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />
                  <CardContent className="relative h-full flex flex-col items-center justify-center text-white p-6">
                    <h3 className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform">{collection.name}</h3>
                    <p className="text-5xl font-bold opacity-90">{collection.count}</p>
                    <p className="text-lg">фотографий</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 text-white drop-shadow-lg">
              Отзывы клиентов
            </h2>
            <p className="text-center text-white/80 mb-12 text-lg drop-shadow-md">
              Что говорят о моей работе
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review, idx) => (
                <Card
                  key={idx}
                  className="backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                        {review.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{review.name}</h3>
                        <div className="flex gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-white/90 italic">"{review.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 backdrop-blur-md bg-white/10">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-5xl font-bold text-center mb-4 text-white drop-shadow-lg">
              О мне
            </h2>
            <Card className="backdrop-blur-md bg-white/20 border border-white/30">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <img
                    src={photos[0]}
                    alt="Photographer"
                    className="w-48 h-48 rounded-full object-cover shadow-2xl"
                  />
                  <div>
                    <h3 className="text-3xl font-bold mb-4 text-white">Александра Фотограф</h3>
                    <p className="text-white/90 text-lg mb-4">
                      Более 10 лет я создаю фотоистории, которые трогают сердца. Моя миссия — запечатлеть искренние эмоции
                      и создать воспоминания, к которым вы будете возвращаться снова и снова.
                    </p>
                    <div className="flex gap-4">
                      <Badge className="bg-pink-500 text-white shadow-lg">500+ съемок</Badge>
                      <Badge className="bg-purple-500 text-white shadow-lg">Международные награды</Badge>
                      <Badge className="bg-blue-500 text-white shadow-lg">10 лет опыта</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Свяжитесь со мной
            </h2>
            <p className="text-white/80 mb-8 text-lg drop-shadow-md">
              Готовы создать свою фотоисторию?
            </p>
            <Card className="backdrop-blur-md bg-white/20 border border-white/30">
              <CardContent className="p-8">
                <div className="grid gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Icon name="Phone" size={24} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">Телефон</p>
                      <p className="text-white/80">+7 (999) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Icon name="Mail" size={24} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">Email</p>
                      <p className="text-white/80">photo@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Icon name="Instagram" size={24} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">Instagram</p>
                      <p className="text-white/80">@photoart_studio</p>
                    </div>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-lg py-6 shadow-xl">
                      <Icon name="Send" size={20} className="mr-2" />
                      Написать сообщение
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="py-12 px-6 backdrop-blur-md bg-white/10 border-t border-white/20">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Icon name="Camera" className="text-pink-400" size={32} />
              <span className="text-2xl font-bold text-white drop-shadow-lg">
                PhotoArt Studio
              </span>
            </div>
            <p className="text-white/70 mb-4">
              © 2024 PhotoArt Studio. Все права защищены.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={24} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" size={24} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Mail" size={24} />
              </Button>
            </div>
          </div>
        </footer>
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl overflow-hidden">
            <img
              src={selectedPhoto || ''}
              alt="Selected"
              className="w-full h-auto transition-transform duration-500"
              style={{ transform: `rotate(${photoRotation}deg)` }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setPhotoRotation((prev) => prev - 90)}
                  className="backdrop-blur-sm"
                >
                  <Icon name="RotateCcw" size={24} />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setPhotoRotation((prev) => prev + 90)}
                  className="backdrop-blur-sm"
                >
                  <Icon name="RotateCw" size={24} />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setPhotoRotation(0)}
                  className="backdrop-blur-sm"
                >
                  <Icon name="Maximize2" size={24} />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;