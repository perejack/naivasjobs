# Survey Ads Implementation - Naivas Jobs

## 📊 Overview
Survey ads have been successfully integrated into the Naivas Jobs application to monetize user interactions during the job application process.

## 🎯 Ad Placement Strategy

### 1. **Successful Payment/Application ✅**
When a user completes their job application payment:
- ✅ **Inline Ad** appears in the payment success modal
- ✅ **Popup Ad** appears after 3 seconds
- Uses Survey Images 1 & 2

### 2. **Application Cancelled ✅**
When a user clicks "Cancel" during application:
- ✅ **Popup Ad** appears immediately
- Uses Survey Image 3

### 3. **Payment Failed ✅**
When payment processing fails:
- ✅ **Popup Ad** appears after 2 seconds
- Uses Survey Image 4

## 📁 Files Added

### 1. **src/components/ui/survey-ad.tsx**
- `SurveyAd` component for inline ads
- `PopupSurveyAd` component for popup ads
- Responsive design with Tailwind CSS
- Click tracking with Google Analytics
- Auto-dismiss functionality

### 2. **src/hooks/useSurveyAds.ts**
- Custom React hook for managing survey ads
- State management for popup visibility
- Ad rotation functionality
- Easy integration with components

### 3. **Survey Images**
- `src/assets/survay1.jpeg` - Survey ad 1
- `src/assets/survay2.jpeg` - Survey ad 2
- `src/assets/survay3.jpeg` - Survey ad 3
- `src/assets/survay4.jpeg` - Survey ad 4

## 🎨 Features

### Ad Components
- **Modern Design** - Purple gradient CTA buttons
- **Responsive Layout** - Works on mobile and desktop
- **Smooth Animations** - Framer Motion powered
- **Close Functionality** - Users can dismiss ads
- **Click Tracking** - Full Google Analytics integration

### Popup Ads
- **Auto-dismiss** - Closes after 8 seconds
- **Progress Bar** - Visual countdown indicator
- **Backdrop Overlay** - Semi-transparent background
- **Smooth Entrance** - Scale and slide animations

### Inline Ads
- **Hover Effects** - Scale up on hover
- **Sponsored Badge** - Clear labeling
- **External Link** - Opens survey platform in new tab

## 📈 Analytics Tracking

All ad interactions are tracked with Google Analytics:

### Events Tracked:
1. **survey_ad_impression** - When ad is shown
2. **survey_ad_click** - When user clicks ad
3. **survey_ad_dismissed** - When user closes ad

### Event Data:
```javascript
{
  ad_id: 'survey-1',
  ad_url: 'https://www.earntasking.online/?ref=naivasjobs',
  timestamp: '2025-01-06T12:00:00.000Z'
}
```

## 🔗 Survey Platform

**URL:** `https://www.earntasking.online/?ref=naivasjobs`

All ads link to this survey platform with a referral parameter to track conversions from the Naivas Jobs site.

## 🎯 Integration Points

### Payment Success Modal
```tsx
// Shows inline ad + popup after 3 seconds
<SurveyAd adIndex={0} className="max-w-sm mx-auto" />
<PopupSurveyAd isOpen={popupVisible} onClose={hidePopupAd} />
```

### Application Modal - Cancel Button
```tsx
onClick={() => {
  showPopupAd(0, 2); // Show immediately with ad index 2
  onClose();
}}
```

### Payment Failed Handler
```tsx
// Show popup ad after 2 seconds when payment fails
showPopupAd(2000, 3);
```

## 📱 Responsive Design

Ads are fully responsive using Tailwind CSS:
- ✅ **Desktop** - Full width with max constraints
- ✅ **Tablet** - Responsive scaling
- ✅ **Mobile** - Touch-friendly buttons

## 🎨 Customization

### Change Survey Platform URL
Edit `src/components/ui/survey-ad.tsx`:
```typescript
const SURVEY_PLATFORM_URL = 'https://your-platform.com/?ref=yourref';
```

### Modify Ad Timing
Edit the respective modal files:
```typescript
// Change popup delay
showPopupAd(5000, 1); // 5 seconds delay

// Change auto-dismiss duration
<PopupSurveyAd displayDuration={10000} /> // 10 seconds
```

### Update Ad Images
Replace images in `src/assets/`:
- `survay1.jpeg`
- `survay2.jpeg`
- `survay3.jpeg`
- `survay4.jpeg`

## 🔧 Technical Stack

- **React 18** - Component framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Google Analytics** - Tracking

## ✅ Implementation Checklist

- [x] Survey images copied to `src/assets/`
- [x] `SurveyAd` component created
- [x] `PopupSurveyAd` component created
- [x] `useSurveyAds` hook implemented
- [x] Payment success modal integration
- [x] Application cancel integration
- [x] Payment failure integration
- [x] Google Analytics tracking
- [x] Responsive design
- [x] Click-through functionality

## 🚀 Usage Examples

### Basic Inline Ad
```tsx
import { SurveyAd } from '@/components/ui/survey-ad';

<SurveyAd adIndex={0} className="my-4" />
```

### Popup Ad with Hook
```tsx
import { useSurveyAds } from '@/hooks/useSurveyAds';
import { PopupSurveyAd } from '@/components/ui/survey-ad';

const { popupVisible, showPopupAd, hidePopupAd } = useSurveyAds();

// Show popup
showPopupAd(2000, 1); // 2 second delay, ad index 1

// Render popup
<PopupSurveyAd 
  isOpen={popupVisible} 
  onClose={hidePopupAd} 
  adIndex={1}
/>
```

## 📊 Expected Results

- **Increased Revenue** - Monetize job application flow
- **High Visibility** - Ads shown at key decision points
- **User Engagement** - Multiple touchpoints with survey platform
- **Conversion Tracking** - Full analytics on ad performance

## 🔄 Ad Flow Summary

1. **User applies for job** → Normal application flow
2. **Payment succeeds** → Inline ad + popup ad (3s delay)
3. **User cancels** → Popup ad (immediate)
4. **Payment fails** → Popup ad (2s delay)
5. **All clicks tracked** → Google Analytics events

---

**Implementation Date:** January 6, 2025  
**Survey Platform:** EarnTasking  
**Tracking:** Multiple Google Analytics IDs  
**Framework:** React + TypeScript + Tailwind CSS
