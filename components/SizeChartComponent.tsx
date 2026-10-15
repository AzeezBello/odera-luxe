'use client';

import { useState } from 'react';

type Unit = 'cm' | 'in';
type Category = 'men' | 'women' | 'traditional';

interface SizeRow {
  size: string;
  uk: string;
  eu: string;
  chestIn: number | string;
  chestCm: number | string;
  waistIn: number | string;
  waistCm: number | string;
  hipIn: number | string;
  hipCm: number | string;
  shoulderIn: number | string;
  shoulderCm: number | string;
  sleeveIn: number | string;
  sleeveCm: number | string;
  inseamIn?: number | string;
  inseamCm?: number | string;
}

const MEN_SIZES: SizeRow[] = [
  { size: 'XS', uk: '36R', eu: '46', chestIn: 36, chestCm: 91, waistIn: 30, waistCm: 76, hipIn: 37, hipCm: 94, shoulderIn: 17.5, shoulderCm: 44.5, sleeveIn: 24.5, sleeveCm: 62, inseamIn: 31, inseamCm: 79 },
  { size: 'S',  uk: '38R', eu: '48', chestIn: 38, chestCm: 96, waistIn: 32, waistCm: 81, hipIn: 39, hipCm: 99, shoulderIn: 18,   shoulderCm: 45.7, sleeveIn: 25,   sleeveCm: 63.5, inseamIn: 31.5, inseamCm: 80 },
  { size: 'M',  uk: '40R', eu: '50', chestIn: 40, chestCm: 102, waistIn: 34, waistCm: 86, hipIn: 41, hipCm: 104, shoulderIn: 18.5, shoulderCm: 47, sleeveIn: 25.5, sleeveCm: 64.8, inseamIn: 32, inseamCm: 81 },
  { size: 'L',  uk: '42R', eu: '52', chestIn: 42, chestCm: 107, waistIn: 36, waistCm: 91, hipIn: 43, hipCm: 109, shoulderIn: 19,   shoulderCm: 48.3, sleeveIn: 26,   sleeveCm: 66, inseamIn: 32.5, inseamCm: 82.5 },
  { size: 'XL', uk: '44R', eu: '54', chestIn: 44, chestCm: 112, waistIn: 38, waistCm: 97, hipIn: 45, hipCm: 114, shoulderIn: 19.5, shoulderCm: 49.5, sleeveIn: 26.5, sleeveCm: 67.3, inseamIn: 33, inseamCm: 84 },
  { size: '2XL',uk: '46R', eu: '56', chestIn: 46, chestCm: 117, waistIn: 40, waistCm: 102, hipIn: 47, hipCm: 119, shoulderIn: 20,   shoulderCm: 50.8, sleeveIn: 27,   sleeveCm: 68.5, inseamIn: 33.5, inseamCm: 85 },
  { size: '3XL',uk: '48R', eu: '58', chestIn: 48, chestCm: 122, waistIn: 42, waistCm: 107, hipIn: 49, hipCm: 124, shoulderIn: 20.5, shoulderCm: 52, sleeveIn: 27.5, sleeveCm: 70, inseamIn: 34, inseamCm: 86 },
];

const WOMEN_SIZES: SizeRow[] = [
  { size: 'XS', uk: '6',  eu: '34', chestIn: 32, chestCm: 81, waistIn: 25, waistCm: 63.5, hipIn: 35, hipCm: 89, shoulderIn: 14.5, shoulderCm: 37, sleeveIn: 23,   sleeveCm: 58.5 },
  { size: 'S',  uk: '8',  eu: '36', chestIn: 34, chestCm: 86, waistIn: 27, waistCm: 68.5, hipIn: 37, hipCm: 94, shoulderIn: 15,   shoulderCm: 38, sleeveIn: 23.5, sleeveCm: 59.5 },
  { size: 'M',  uk: '10', eu: '38', chestIn: 36, chestCm: 91, waistIn: 29, waistCm: 73.5, hipIn: 39, hipCm: 99, shoulderIn: 15.5, shoulderCm: 39.5, sleeveIn: 24, sleeveCm: 61 },
  { size: 'L',  uk: '12', eu: '40', chestIn: 38, chestCm: 96, waistIn: 31, waistCm: 78.5, hipIn: 41, hipCm: 104, shoulderIn: 16,  shoulderCm: 40.5, sleeveIn: 24.5, sleeveCm: 62 },
  { size: 'XL', uk: '14', eu: '42', chestIn: 40, chestCm: 101, waistIn: 33, waistCm: 84, hipIn: 43, hipCm: 109, shoulderIn: 16.5, shoulderCm: 42, sleeveIn: 25,   sleeveCm: 63.5 },
  { size: '2XL',uk: '16', eu: '44', chestIn: 42, chestCm: 107, waistIn: 35, waistCm: 89, hipIn: 45, hipCm: 114, shoulderIn: 17,   shoulderCm: 43, sleeveIn: 25.5, sleeveCm: 64.5 },
  { size: '3XL',uk: '18', eu: '46', chestIn: 44, chestCm: 112, waistIn: 37, waistCm: 94, hipIn: 47, hipCm: 119, shoulderIn: 17.5, shoulderCm: 44.5, sleeveIn: 26, sleeveCm: 66 },
];

interface TraditionalRow {
  size: string;
  chestIn: string;
  chestCm: string;
  kaftanLenIn: string;
  kaftanLenCm: string;
  sleeveSpanIn: string;
  sleeveSpanCm: string;
  trouserLenIn: string;
  trouserLenCm: string;
  waistIn: string;
  waistCm: string;
}

const TRADITIONAL_SIZES: TraditionalRow[] = [
  { size: 'S',  chestIn: '38 - 40', chestCm: '96 - 102',  kaftanLenIn: '54', kaftanLenCm: '137', sleeveSpanIn: '32', sleeveSpanCm: '81', trouserLenIn: '40', trouserLenCm: '102', waistIn: '30 - 32', waistCm: '76 - 81' },
  { size: 'M',  chestIn: '41 - 43', chestCm: '104 - 109', kaftanLenIn: '56', kaftanLenCm: '142', sleeveSpanIn: '33', sleeveSpanCm: '84', trouserLenIn: '41', trouserLenCm: '104', waistIn: '33 - 35', waistCm: '84 - 89' },
  { size: 'L',  chestIn: '44 - 46', chestCm: '112 - 117', kaftanLenIn: '58', kaftanLenCm: '147', sleeveSpanIn: '34', sleeveSpanCm: '86', trouserLenIn: '42', trouserLenCm: '107', waistIn: '36 - 38', waistCm: '91 - 97' },
  { size: 'XL', chestIn: '47 - 49', chestCm: '119 - 124', kaftanLenIn: '60', kaftanLenCm: '152', sleeveSpanIn: '35', sleeveSpanCm: '89', trouserLenIn: '43', trouserLenCm: '109', waistIn: '39 - 41', waistCm: '99 - 104' },
  { size: '2XL',chestIn: '50 - 52', chestCm: '127 - 132', kaftanLenIn: '61', kaftanLenCm: '155', sleeveSpanIn: '35.5', sleeveSpanCm: '90', trouserLenIn: '44', trouserLenCm: '112', waistIn: '42 - 44', waistCm: '107 - 112' },
];

export function SizeChartComponent({ initialCategory = 'men' }: { initialCategory?: Category }) {
  const [category, setCategory] = useState<Category>(initialCategory);
  const [unit, setUnit] = useState<Unit>('cm');

  // Custom measurement states for WhatsApp sending
  const [customName, setCustomName] = useState('');
  const [customChest, setCustomChest] = useState('');
  const [customWaist, setCustomWaist] = useState('');
  const [customHip, setCustomHip] = useState('');
  const [customShoulder, setCustomShoulder] = useState('');
  const [customSleeve, setCustomSleeve] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');

  const sendCustomMeasurements = (e: React.FormEvent) => {
    e.preventDefault();
    const details = [
      `*ODERA Luxe Bespoke Sizing Submission*`,
      `Client Name: ${customName || 'Private Client'}`,
      `Unit: ${unit.toUpperCase()}`,
      customChest ? `• Chest / Bust: ${customChest} ${unit}` : null,
      customWaist ? `• Waist: ${customWaist} ${unit}` : null,
      customHip ? `• Hips: ${customHip} ${unit}` : null,
      customShoulder ? `• Shoulder: ${customShoulder} ${unit}` : null,
      customSleeve ? `• Sleeve Length: ${customSleeve} ${unit}` : null,
      customHeight ? `• Height / Trouser Length: ${customHeight} ${unit}` : null,
      customNotes ? `\nStyle / Fitting Preferences:\n${customNotes}` : null,
      `\nPlease advise on recommended sizing or arrange a bespoke fitting.`
    ].filter(Boolean).join('\n');

    if (number) {
      window.open(`https://wa.me/${number}?text=${encodeURIComponent(details)}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="sizeChartRoot">
      <div className="sizeChartControls">
        <div className="categoryTabs">
          <button
            type="button"
            className={`categoryTab ${category === 'men' ? 'active' : ''}`}
            onClick={() => setCategory('men')}
          >
            Men’s Tailoring
          </button>
          <button
            type="button"
            className={`categoryTab ${category === 'women' ? 'active' : ''}`}
            onClick={() => setCategory('women')}
          >
            Women’s Couture
          </button>
          <button
            type="button"
            className={`categoryTab ${category === 'traditional' ? 'active' : ''}`}
            onClick={() => setCategory('traditional')}
          >
            Agbada & Traditional
          </button>
        </div>

        <div className="unitToggle">
          <span className="unitLabel">Units:</span>
          <button
            type="button"
            className={`unitBtn ${unit === 'cm' ? 'active' : ''}`}
            onClick={() => setUnit('cm')}
          >
            CM
          </button>
          <button
            type="button"
            className={`unitBtn ${unit === 'in' ? 'active' : ''}`}
            onClick={() => setUnit('in')}
          >
            INCHES
          </button>
        </div>
      </div>

      <div className="tableContainer">
        {category === 'traditional' ? (
          <table className="sizeTable">
            <thead>
              <tr>
                <th>ODERA Size</th>
                <th>Chest / Torso ({unit})</th>
                <th>Kaftan Length ({unit})</th>
                <th>Sleeve Span ({unit})</th>
                <th>Trouser Length ({unit})</th>
                <th>Trouser Waist ({unit})</th>
              </tr>
            </thead>
            <tbody>
              {TRADITIONAL_SIZES.map((row) => (
                <tr key={row.size}>
                  <td><strong>{row.size}</strong></td>
                  <td>{unit === 'cm' ? row.chestCm : row.chestIn}</td>
                  <td>{unit === 'cm' ? row.kaftanLenCm : row.kaftanLenIn}</td>
                  <td>{unit === 'cm' ? row.sleeveSpanCm : row.sleeveSpanIn}</td>
                  <td>{unit === 'cm' ? row.trouserLenCm : row.trouserLenIn}</td>
                  <td>{unit === 'cm' ? row.waistCm : row.waistIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="sizeTable">
            <thead>
              <tr>
                <th>ODERA Size</th>
                <th>UK / US</th>
                <th>EU</th>
                <th>{category === 'women' ? 'Bust' : 'Chest'} ({unit})</th>
                <th>Waist ({unit})</th>
                <th>Hips ({unit})</th>
                <th>Shoulder ({unit})</th>
                <th>Sleeve ({unit})</th>
                {category === 'men' && <th>Inseam ({unit})</th>}
              </tr>
            </thead>
            <tbody>
              {(category === 'men' ? MEN_SIZES : WOMEN_SIZES).map((row) => (
                <tr key={row.size}>
                  <td><strong>{row.size}</strong></td>
                  <td>{row.uk}</td>
                  <td>{row.eu}</td>
                  <td>{unit === 'cm' ? row.chestCm : row.chestIn}</td>
                  <td>{unit === 'cm' ? row.waistCm : row.waistIn}</td>
                  <td>{unit === 'cm' ? row.hipCm : row.hipIn}</td>
                  <td>{unit === 'cm' ? row.shoulderCm : row.shoulderIn}</td>
                  <td>{unit === 'cm' ? row.sleeveCm : row.sleeveIn}</td>
                  {category === 'men' && <td>{unit === 'cm' ? row.inseamCm : row.inseamIn}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="fitNotes">
        <div className="fitNoteItem">
          <strong>The ODERA Structured Fit</strong>
          <p>
            Our suiting and couture pieces are cut with a tailored silhouette emphasizing strong posture and clean architectural lines. If you are between sizes or prefer a relaxed drape, our tailors recommend selecting the larger size or opting for bespoke customization.
          </p>
        </div>
        <div className="fitNoteItem">
          <strong>Complimentary Alterations</strong>
          <p>
            All ODERA Luxe bespoke commissions include complimentary fitting adjustments in our Lagos atelier. For clients outside Lagos, our master cutters accommodate detailed custom measurements before dispatch.
          </p>
        </div>
      </div>

      <section className="measureSection" id="how-to-measure">
        <div className="eyebrow">Precision Guide</div>
        <h3 className="serif">How to Measure</h3>
        <p className="body" style={{ maxWidth: '600px' }}>
          For the most accurate result, wear lightweight clothing and hold the measuring tape comfortably snug without pulling tightly.
        </p>

        <div className="measureGrid">
          <div className="measureCard">
            <span className="measureStep">01</span>
            <h4>Chest / Bust</h4>
            <p>
              Wrap the tape around the fullest part of your chest or bust, keeping the tape horizontal and parallel to the floor under your armpits.
            </p>
          </div>
          <div className="measureCard">
            <span className="measureStep">02</span>
            <h4>Natural Waist</h4>
            <p>
              Measure around your natural waistline, where your torso naturally bends (typically an inch above your navel). Keep one finger between the tape and your body.
            </p>
          </div>
          <div className="measureCard">
            <span className="measureStep">03</span>
            <h4>Hips & Seat</h4>
            <p>
              Stand with your heels together and measure around the fullest circumference of your hips and buttocks.
            </p>
          </div>
          <div className="measureCard">
            <span className="measureStep">04</span>
            <h4>Shoulder Width</h4>
            <p>
              Measure across the curve of your upper back from the tip of the left shoulder bone straight across to the right shoulder bone.
            </p>
          </div>
          <div className="measureCard">
            <span className="measureStep">05</span>
            <h4>Sleeve Length</h4>
            <p>
              With your arm slightly bent at the elbow, measure from the shoulder point down over the elbow to the wrist bone where your cuff should rest.
            </p>
          </div>
          <div className="measureCard">
            <span className="measureStep">06</span>
            <h4>Inseam / Length</h4>
            <p>
              Measure from the inside of your crotch down the inner leg to the top of your shoe, or along the seam of a pair of well-fitting trousers.
            </p>
          </div>
        </div>
      </section>

      <section className="bespokeMeasureFormSection">
        <div className="bespokeMeasureBox">
          <div className="eyebrow">Custom Tailoring</div>
          <h3 className="serif">Send Your Measurements to Our Master Tailors</h3>
          <p className="body" style={{ maxWidth: '600px', margin: '0 auto 30px' }}>
            Prefer a bespoke garment crafted strictly to your unique anatomy? Fill in your measurements below to connect directly with the ODERA cutting room via WhatsApp.
          </p>

          <form onSubmit={sendCustomMeasurements} className="measureForm">
            <div className="measureInputsGrid">
              <div className="formField">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Adebayo Adeleke"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                />
              </div>
              <div className="formField">
                <label>Chest / Bust ({unit})</label>
                <input
                  type="text"
                  placeholder={`e.g. ${unit === 'cm' ? '102' : '40'}`}
                  value={customChest}
                  onChange={(e) => setCustomChest(e.target.value)}
                />
              </div>
              <div className="formField">
                <label>Waist ({unit})</label>
                <input
                  type="text"
                  placeholder={`e.g. ${unit === 'cm' ? '86' : '34'}`}
                  value={customWaist}
                  onChange={(e) => setCustomWaist(e.target.value)}
                />
              </div>
              <div className="formField">
                <label>Hips ({unit})</label>
                <input
                  type="text"
                  placeholder={`e.g. ${unit === 'cm' ? '104' : '41'}`}
                  value={customHip}
                  onChange={(e) => setCustomHip(e.target.value)}
                />
              </div>
              <div className="formField">
                <label>Shoulder Width ({unit})</label>
                <input
                  type="text"
                  placeholder={`e.g. ${unit === 'cm' ? '47' : '18.5'}`}
                  value={customShoulder}
                  onChange={(e) => setCustomShoulder(e.target.value)}
                />
              </div>
              <div className="formField">
                <label>Sleeve Length ({unit})</label>
                <input
                  type="text"
                  placeholder={`e.g. ${unit === 'cm' ? '65' : '25.5'}`}
                  value={customSleeve}
                  onChange={(e) => setCustomSleeve(e.target.value)}
                />
              </div>
              <div className="formField fullWidth">
                <label>Height & Inseam / Garment Length ({unit})</label>
                <input
                  type="text"
                  placeholder={`e.g. Height: ${unit === 'cm' ? '182 cm' : '6ft 0in'}, Inseam: ${unit === 'cm' ? '81 cm' : '32 in'}`}
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                />
              </div>
              <div className="formField fullWidth">
                <label>Specific Garment or Fit Notes (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Mention desired fit (e.g. structured taper, ceremonial drape, agbada fullness, specific event date)..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn darkbtn measureSubmitBtn">
              Send Measurements via WhatsApp Concierge →
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
